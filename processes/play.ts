import type { Manager } from 'magmastream';
import type { APIInteraction } from 'discord-api-types/v10';
import { LoadTypes, ProcessResponses } from '../helpers/enums';
import type { ProcessResponseType } from '../helpers/types';

/**
 * Plays music through lavalink player
 *
 * @param music - Manager
 * @param query - Music search query
 * @param cmd - Discord API Interaction
 * @param vc - Voice channel id requesting user is in
 * @param next - (optional) - Add to the top of queue
 * @returns Object containing a response of ProcessResponseType
 */
export default async function play(music: Manager, query: string, cmd: APIInteraction, vc: string, next?: boolean) {
  const playResponse = {} as ProcessResponseType;

  if (!cmd.guild_id) {
    // Should be unreachable but let's catch it
    console.warn('Play process is missing guild id');

    playResponse.response = ProcessResponses.NoPlayer;
    return playResponse;
  }

  let player = music.players.has(cmd.guild_id) ? music.players.get(cmd.guild_id) : undefined;

  if (player && player.voiceChannel !== vc) {
    // Player is already playing music in a different channel
    playResponse.response = ProcessResponses.PlayerBusy;
    return playResponse;
  }

  const results = await music.search(query, cmd.user);

  let tracks;

  switch (results.loadType) {
    case LoadTypes.NoMatches:
      return { response: ProcessResponses.NoMatches } as ProcessResponseType;
    case LoadTypes.PlaylistLoaded:
      tracks = results.playlist?.tracks;
      playResponse.playlistInfo = results.playlist;
      playResponse.response = ProcessResponses.PlaylistLoaded;
      break;
    case LoadTypes.TrackLoaded:
    case LoadTypes.SearchResult: {
      tracks = results.tracks[0];
      playResponse.trackInfo = tracks;
      playResponse.response = ProcessResponses.TrackLoaded;
      break;
    }
    case LoadTypes.LoadFailed:
    default:
      return { response: ProcessResponses.LoadFailed } as ProcessResponseType;
  }

  if (!tracks) return { response: ProcessResponses.LoadFailed } as ProcessResponseType;

  if (!player)
    player = await music.create({
      guild: cmd.guild_id,
      voiceChannel: vc,
      textChannel: cmd.channel?.id ?? '',
      volume: 100,
    });

  if (!player) {
    // Player failed to create for whatever reason
    // Hopefully we never get here but who knows
    playResponse.response = ProcessResponses.NoPlayer;
    return playResponse;
  }

  player.connect();

  player.queue.add(tracks, next ? 1 : undefined);

  // TODO: Add caching

  if (!player.playing && !player.paused) {
    await player.play();
  }

  return playResponse;
}
