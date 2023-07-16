import type { MoonlinkManager, MoonlinkPlayer, MoonlinkTrack, SearchResult } from 'moonlink.js';
import type { APIInteraction } from 'discord-api-types/v10';
import { LoadTypes, ProcessResponses } from '../helpers/enums';
import type { ProcessResponseType } from '../helpers/types';

function addTracks(player: MoonlinkPlayer, tracks: MoonlinkTrack | MoonlinkTrack[]) {
  if (Array.isArray(tracks)) {
    for (const track of tracks) {
      player.queue.add(track);
    }
  } else {
    player.queue.add(tracks);
  }
}

/**
 * Plays music through lavalink player
 *
 * @param music - MoonlinkManager
 * @param query - Music search query
 * @param cmd - Discord API Interaction
 * @param vc - Voice channel id requesting user is in
 * @param next - (optional) - Add to the top of queue
 * @returns Object containing a response of ProcessResponseType
 */
export default async function play(music: MoonlinkManager, query: string, cmd: APIInteraction, vc: string, next?: boolean) {
  const playResponse = {} as ProcessResponseType;

  if (!cmd.guild_id) {
    // Should be unreachable but let's catch it
    console.warn('Play process is missing guild id');

    playResponse.response = ProcessResponses.NoPlayer;
    return playResponse;
  }

  let player = music.players.has(cmd.guild_id) ? music.players.get(cmd.guild_id) : undefined;

  if (!player)
    player = await music.players.create({
      guildId: cmd.guild_id,
      voiceChannel: vc,
      textChannel: cmd.channel?.id ?? '',
    });

  if (!player) {
    // Player failed to create for whatever reason
    // Hopefully we never get here but who knows
    playResponse.response = ProcessResponses.NoPlayer;
    return playResponse;
  }

  if (player && player.voiceChannel !== vc) {
    // Player is already playing music in a different channel
    playResponse.response = ProcessResponses.PlayerBusy;
    return playResponse;
  }

  let results = {} as SearchResult;
  if (music.spotify.check(query)) {
    results = await music.spotify.fetch(query);
  } else {
    results = await music.search(query);
  }

  let tracks;

  switch (results.loadType) {
    case LoadTypes.NoMatches:
      return { response: ProcessResponses.NoMatches } as ProcessResponseType;
    case LoadTypes.PlaylistLoaded:
      tracks = results.tracks;
      playResponse.playlistInfo = results.playlistInfo;
      playResponse.response = ProcessResponses.PlaylistLoaded;
      break;
    case LoadTypes.TrackLoaded:
    case LoadTypes.SearchResult: {
      tracks = results.tracks[0];
      tracks.requester = cmd.user;
      playResponse.trackInfo = tracks;
      playResponse.response = ProcessResponses.TrackLoaded;
      break;
    }
    case LoadTypes.LoadFailed:
    default:
      return { response: ProcessResponses.LoadFailed } as ProcessResponseType;
  }

  if (!player?.connected) {
    player.connect({ setDeaf: true, setMute: false });
  }

  if (next) {
    const currentQueue = (await player.queue.all) as MoonlinkTrack[];
    player.queue.clear();
    addTracks(player, tracks);
    addTracks(player, currentQueue);
  } else {
    addTracks(player, tracks);
  }

  // TODO: Add caching

  if (!player.playing) {
    await player.play();
  } else if (player.paused) {
    await player.resume();
  }
  return playResponse;
}
