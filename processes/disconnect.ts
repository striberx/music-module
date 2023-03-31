import { MoonlinkManager } from 'moonlink.js';
import { ProcessResponses } from '../helpers/enums';
import type { ProcessResponseType } from '../helpers/types';

/**
 * Disconncts lavalink player
 *
 * @param music - MoonlinkManager
 * @param guildId - Guild ID that the player is in
 * @returns Object containing a response of ProcessResponseType
 */
export default async function disconnect(music: MoonlinkManager, guildId: string) {
  const playResponse = {} as ProcessResponseType;

  const player = music.players.get(guildId);
  if (!player?.connected) {
    playResponse.response = ProcessResponses.NoPlayer;
    return playResponse;
  }

  player.disconnect();
  player.destroy();

  playResponse.response = ProcessResponses.PlayerDisconnected;
  return playResponse;
}
