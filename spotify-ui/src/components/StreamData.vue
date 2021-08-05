<template>
  <div>
    <q-table
      class="q-my-md"
      title="Artists Streamed"
      :columns="findCols(Column.Artist)"
      :data="streamedArtists"
      row-key="name"
    />
    <q-table
      class="q-my-md"
      title="Songs Streamed"
      :columns="findCols(Column.Song)"
      :data="streamedSongs"
      row-key="name"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  onMounted,
  ref
} from '@vue/composition-api';
import Song from '../models/Song';
import StreamedArtist from '../models/StreamedArtist';
import StreamedSong from '../models/StreamedSong';

export default defineComponent({
  name: 'FileUpload',
  props: {
    streamHist: {
      type: Array as PropType<Song[]>,
      required: true
    }
  },
  setup(props) {
    enum Column {
      Artist,
      Song
    }
    const userArtists = ref<Map<string, StreamedArtist>>(
      new Map<string, StreamedArtist>()
    );
    const streamedArtists = ref<StreamedArtist[]>([]);
    const userSongs = ref<Map<string, StreamedSong>>(
      new Map<string, StreamedSong>()
    );
    const streamedSongs = ref<StreamedSong[]>([]);
    // const monthHabits = ref();
    // const dayHabits = ref();
    // const hourHabits = ref();
    // To be implemented in future with Spotify API:
    // const userAlbums = ref();

    onMounted(() => {
      for (const listen of props.streamHist) {
        addOrSumArtist(listen);
        addOrSumSong(listen);
        // addToMonth(listen);
        // addToDay(listen);
        // addToHour(listen);
      }
      streamedArtists.value = Array.from(userArtists.value.values());
      streamedSongs.value = Array.from(userSongs.value.values());
    });

    const findCols = function(table: Column) {
      let columns: Record<string, unknown>[] = [];

      if (table === Column.Artist) {
        columns.push({
          name: 'artist',
          required: true,
          align: 'center',
          label: 'Artist',
          field: (currentArtist: StreamedArtist) => currentArtist.name,
          format: (value: string) => `${value}`,
          sortable: true
        });
      } else if (table === Column.Song) {
        columns.push(
          {
            name: 'track',
            required: true,
            align: 'center',
            label: 'Track',
            field: (currentSong: StreamedSong) => currentSong.title,
            format: (value: string) => `${value}`,
            sortable: true
          },
          {
            name: 'artist',
            required: true,
            align: 'center',
            label: 'Artist',
            field: (currentSong: StreamedSong) => currentSong.artist,
            format: (value: string) => `${value}`,
            sortable: true
          }
        );
      }
      return columns.concat([
        {
          name: 'minsStreamed',
          required: true,
          align: 'center',
          label: 'Minutes Streamed',
          field: 'minsStreamed',
          sortable: true
        },
        {
          name: 'plays',
          required: true,
          align: 'center',
          label: 'Plays',
          field: 'plays',
          sortable: true
        }
      ]);
    };

    const addOrSumArtist = function(listenInst: Song) {
      let minutesListened = parseInt(listenInst.msPlayed) / 60000;
      let numberOfPlays = 1;
      if (userArtists.value.has(listenInst.artistName)) {
        minutesListened +=
          userArtists.value.get(listenInst.artistName)?.minsStreamed ?? 0;
        numberOfPlays +=
          userArtists.value.get(listenInst.artistName)?.plays ?? 0;
      }
      userArtists.value.set(listenInst.artistName, {
        name: listenInst.artistName,
        minsStreamed: parseFloat(minutesListened.toFixed(2)),
        plays: numberOfPlays
      });
    };

    const addOrSumSong = function(listenInst: Song) {
      let minutesListened = parseInt(listenInst.msPlayed) / 60000;
      let numberOfPlays = 1;
      if (userSongs.value.has(listenInst.trackName)) {
        minutesListened +=
          userSongs.value.get(listenInst.trackName)?.minsStreamed ?? 0;
        numberOfPlays += userSongs.value.get(listenInst.trackName)?.plays ?? 0;
      }
      userSongs.value.set(listenInst.trackName, {
        title: listenInst.trackName,
        artist: listenInst.artistName,
        minsStreamed: parseFloat(minutesListened.toFixed(2)),
        plays: numberOfPlays
      });
    };

    // const addToMonth = function(listenInst: Song){

    // }

    // const addToDay = function(listenInst: Song){

    // }

    // const addToHour = function(listenInst: Song){

    // }

    return { Column, findCols, streamedArtists, streamedSongs };
  }
});
</script>
