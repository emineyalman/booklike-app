<template>
  <div>
    <app-header />
    <div class="flex flex-row">
      <SidebarPage @category-changed="updateBookmarkList" />
      <!-- items prop'unu AppBookmarkList bileşenine geçir -->
      <app-bookmark-list v-if="bookmarkList.length > 0" :items="bookmarkList" />
      <div v-else>Bookmark bulunmamaktadır..</div>
    </div>
  </div>
</template>

<script>
import SidebarPage from "../components/Home/SidebarPage.vue";

export default {
  components: {
    SidebarPage,
  },
  data() {
    return {
      bookmarkList: [],
    };
  },
  created() {
    // Bookmark listesini al ve bookmarkList verisine ata
    this.$appAxios.get("/bookmarks?_expand=category&_expand=user").then((bookmark_list_response) => {
      console.log("bookmark_list_response :>> ", bookmark_list_response);
      this.bookmarkList = bookmark_list_response?.data || [];
    });
  },
  methods: {
    updateBookmarkList(categoryId) {
      const url = categoryId ? `/bookmarks?_expand=category&_expand=user&categoryId=${categoryId}` : `/bookmarks?_expand=category&_expand=user`;
      this.$appAxios.get(url).then((bookmark_list_response) => {
        this.bookmarkList = bookmark_list_response?.data || [];
      });
    },
  },
};
</script>
