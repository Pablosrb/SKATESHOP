<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventParticipant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\EventMatch;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Pedimos los eventos
        $events = Event::withCount('participants')->orderBy('start_date', 'asc')->get();

        return response()->json([
            'data' => $events
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validamos
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'location' => 'required|string',
            'max_participants' => 'required|integer|in:4,8,16', // Solo potencias de 2
        ]);

        $event = Event::create($validated);

        return response()->json(['message' => 'Torneo creado', 'data' => $event], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $event = Event::withCount('participants')
            ->with(['participants', 'matches.player1', 'matches.player2'])
            ->findOrFail($id);

        return response()->json([
            'data' => $event
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $event = Event::findOrFail($id);

        $event->delete();

        return response()->json(['message' => 'Torneo eliminado correctamente']);
    }

    public function join($id)
    {
        $user = Auth::user();
        $event = Event::withCount('participants')->findOrFail($id);

        // Validaciones
        if ($event->status !== 'open') {
            return response()->json(['message' => 'Las inscripciones están cerradas'], 400);
        }
        if ($event->participants_count >= $event->max_participants) {
            return response()->json(['message' => 'El torneo está lleno'], 400);
        }
        // Verificar si ya está dentro
        $exists = EventParticipant::where('event_id', $event->id)
            ->where('user_id', $user->id)
            ->exists();

        if ($exists) {
            return response()->json(['message' => 'Ya estás inscrito en este torneo'], 409);
        }

        EventParticipant::create([
            'event_id' => $event->id,
            'user_id' => $user->id
        ]);

        return response()->json(['message' => 'Inscripción exitosa']);
    }

    public function startTournament($id)
    {
        $event = Event::with('participants')->findOrFail($id);
        $participants = $event->participants;
        $count = $participants->count();

        //validamos mínimo 4
        if ($count < 4) {
            return response()->json(['message' => 'Se necesitan al menos 4 participantes.'], 400);
        }

        $totalRounds = ceil(log($count, 2));

        // Calcular cuántos partidos habrá en la ronda 1
        $slots = pow(2, $totalRounds);

        $nextRoundMatchIds = [];

        for ($round = $totalRounds; $round >= 1; $round--) {
            $matchesInRound = pow(2, $totalRounds - $round);
            $currentRoundMatchIds = [];

            for ($i = 0; $i < $matchesInRound; $i++) {
                // Lógica de padre/hijo
                $nextMatchId = null;
                if ($round < $totalRounds) {
                    $parentIndex = floor($i / 2);
                    $nextMatchId = $nextRoundMatchIds[$parentIndex] ?? null;
                }

                $match = EventMatch::create([
                    'event_id' => $event->id,
                    'round' => $round,
                    'next_match_id' => $nextMatchId,
                ]);

                $currentRoundMatchIds[] = $match->id;
            }
            $nextRoundMatchIds = $currentRoundMatchIds;
        }

        $round1Matches = EventMatch::where('event_id', $event->id)
            ->where('round', 1)
            ->orderBy('id', 'asc')
            ->get();

        $shuffledPlayers = $participants->shuffle();

        foreach ($round1Matches as $index => $match) {
            // Cogemos jugador p1 y p2. Si no existen (porque somos impares), será null.
            $p1 = $shuffledPlayers[$index * 2] ?? null;
            $p2 = $shuffledPlayers[($index * 2) + 1] ?? null;

            if ($p1) $match->player1_id = $p1->id;
            if ($p2) $match->player2_id = $p2->id;

            $match->save();
        }

        $event->status = 'ongoing';
        $event->save();

        return response()->json(['message' => 'Torneo iniciado con ' . $count . ' participantes (Bracket de ' . $slots . ').']);
    }

    public function setWinner(Request $request, $matchId)
    {
        $match = EventMatch::findOrFail($matchId);
        $winnerId = $request->input('winner_id');

        $match->winner_id = $winnerId;
        $match->save();

        // MOVER AL GANADOR A LA SIGUIENTE RONDA
        if ($match->next_match_id) {
            $nextMatch = EventMatch::find($match->next_match_id);

            // Si el hueco 1 está vacío, lo metemos ahí. Si no hueco 2
            if (!$nextMatch->player1_id) {
                $nextMatch->player1_id = $winnerId;
            } else {
                $nextMatch->player2_id = $winnerId;
            }
            $nextMatch->save();
        } else {
            // Si no hay siguiente partido, es que era la final.
            $event = Event::find($match->event_id);
            $event->winner_id = $winnerId;
            $event->status = 'finished';
            $event->save();
        }

        return response()->json(['message' => 'Ganador actualizado y avanzado de ronda']);
    }
}
