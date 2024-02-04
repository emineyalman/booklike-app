<template>
  <app-header />
  <div class="flex flex-row">
    <SidebarPage />
    <app-bookmark-list :items="bookmarkList" />
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
    this.$appAxios.get("/bookmarks?_expand=category&_expand=user").then((bookmark_list_response) => {
      console.log("bookmark_list_response :>> ", bookmark_list_response);
      this.bookmarkList = bookmark_list_response?.data || [];
    });
  },
};
</script>