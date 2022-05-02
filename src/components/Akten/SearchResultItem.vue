<template>
  <main>
    <div class="col elem">
      <svg v-if="!showTitle" v-on:click="toggleTitle" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
           fill="currentColor"
           class="bi bi-caret-right"
           viewBox="0 0 16 16">
        <path
            d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
      </svg>
      <svg v-if="showTitle" v-on:click="toggleTitle" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
           fill="currentColor"
           class="bi bi-caret-down" viewBox="0 0 16 16">
        <path
            d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
      </svg>
      <div v-on:click="navToObjects">
        Fall: {{ item.collection }}
      </div>
    </div>
    <div v-if="showTitle" class="title elem" v-on:click="toggleKwic">
      <svg v-if="!showKwic" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
           class="bi bi-caret-right"
           viewBox="0 0 16 16">
        <path
            d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
      </svg>
      <svg v-if="showKwic" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
           class="bi bi-caret-down" viewBox="0 0 16 16">
        <path
            d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
      </svg>
      <div v-on:click="navToLF">
        Dokument: {{ item.title }}
      </div>
    </div>
    <div v-if="showTitle && showKwic">
      <div v-on:click="navToLFWithKeyword">
        <div class="kwic elem" v-for="(kwic, i) in item.kwic" :key="`kw${i}`">
          <div v-html="kwic" class="text-left"/>
        </div>
      </div>
    </div>

  </main>
</template>

<script>
export default {
  name: "SearchResultItem",
  props: ['item'],
  data: function () {
    return {
      showTitle: false,
      showKwic: false
    }
  },
  methods: {
    toggleTitle() {
      this.showTitle = !this.showTitle;
    },
    toggleKwic() {
      this.showKwic = !this.showKwic;
    },
    navToObjects() {
      this.$emit("nav-to-objects", {id: this.item.collectionId})
    },
    navToLF() {
      this.$router.push({
        name: "lesefassung",
        params: {id: this.item.id}

      });
    },
    navToLFWithKeyword() {
      let text = new DOMParser()
          .parseFromString(this.item.kwic[0], "text/html")
          .documentElement.textContent;
      //remove multiple whitespaces
      let contextNoMultSpace = text.replace(/\s\s+/g, ' ').substring(0, 20);
      this.$router.push({
        name: "lesefassung",
        params: {id: this.item.id, searchTermContext: contextNoMultSpace}

      });
    }
  },
}
</script>

<style scoped>

main {
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 0;
  margin-right: 0;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: var(--secondary-gray-light);
}

.elem {
  display: flex;
  text-align: left;
  cursor: pointer;
}

.col {
  font-weight: bold;
  padding-bottom: 0.5rem;
}

.title {
  margin-left: 3rem;
  padding-bottom: 0.5rem;
}

.kwic {
  margin-left: 6rem;
}
</style>