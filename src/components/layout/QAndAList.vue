<template>
  <div class="tab-content">
    <h2>Q and A</h2>
    <ul>
      <li
        v-for="QAndA in QAndAs || [] "
        :key="QAndA.fullText">
        <q-and-a-list-item :passed-q-and-a="QAndA" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import QAndAListItem from '@/components/layout/QAndAListItem.vue';

export default {
  components: {
    QAndAListItem,
  },
  props: {
    items: {
      default: () => [],
      type: Array,
    },
  },
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters({
      QAndAs: 'categoryPages/QAndAs',
    }),
  },
};

</script>
