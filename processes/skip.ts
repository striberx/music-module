import type { Manager } from 'magmastream';
import { ProcessResponses } from '../helpers/enums';
import type { ProcessResponseType } from '../helpers/types';

/**
 * Skip current track playing on lavalink player
 *
 * @param music - Manager
 * @param guildId - Guild ID that the player is in
 * @returns Object containing a response of ProcessResponseType
 */
export default async function skip(music: Manager, guildId: string) {
  const playResponse = {} as ProcessResponseType;

  const player = music.players.get(guildId);
  if (!player) {
    playResponse.response = ProcessResponses.NoPlayer;
    return playResponse;
  }

  if (!player.playing) {
    playResponse.response = ProcessResponses.PlayerNotPlaying;
    return playResponse;
  }

  player.stop();

  playResponse.response = ProcessResponses.TrackSkipped;
  return playResponse;
}
