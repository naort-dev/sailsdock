<template>
  <div class="ui-sidebar --wrapper overflow --scroll">
    <b-container>
      <b-row class="justify-content-center pt-5 pb-5">
        <b-col sm="6">
          <Searchbar
            :search-query-object="$store.state.githubLibrary.query"
            update-search-query="githubLibrary/updateSearchQuery"
            add-searchable-collection="githubLibrary/addSearchableCollection"
            :collection="collection"
            container-class=""
            row-class="justify-content-start h-100 w-100"
            b-input-group-class="--round-right-w-border"
            :enable-search-button="true"
            @search-github-repositories="search"
          />
        </b-col>
        <b-col class="text-right">
          <span
            class="material-icons pointer"
            @click="
              $store.commit('offscreen/toggle', { type: 'library' }),
                $store.commit('toggleOffscreens')
            "
          >
            close
          </span>
        </b-col>
      </b-row>
      <b-row
        v-if="collection !== null && !$store.state.loader"
        class="justify-content-start"
      >
        <b-col
          v-for="(repo, i) in collection.slice(minResults, maxResults)"
          :key="i"
          sm="6"
        >
          <b-card
            v-b-tooltip.hover.rightbottom="repo.description"
            class="text-center mb-3 min-h-20rem"
          >
            <img width="48" height="48" :src="repo.owner.avatar_url" />

            <div class="">
              <h3 class="text-transform --capitalize pt-3">
                {{ repo.name }}
              </h3>
              <div class="d-flex pb-3 justify-content-center font-bold-gray">
                <div class="d-flex">
                  <span class="material-icons align-self-center pb-0">
                    grade
                  </span>
                  <span class="align-self-center pl-1">
                    {{
                      repo.stargazers_count
                        .toString()
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                    }}
                  </span>
                </div>
              </div>
              <div v-if="repo.has_wikii">Url: {{ repo.homepage }}</div>
            </div>
            <!-- <div class="mt-4 mb-4 pointer" @click="modalFunction(i)">
              <i class="icofont-ui-note" />{{ ' ' + $t('learnMore') }}
            </div> -->
            <div
              v-if="repo.language === 'JavaScript'"
              class="button --primary --block --round"
              @click="
                add({
                  clone_url: repo.clone_url,
                  name: repo.name,
                  description: repo.description
                }),
                  $store.commit('offscreen/toggle', { type: 'library' }),
                  $store.commit('toggleOffscreens')
              "
            >
              <div class="w-100">{{ $t('select') }}</div>
            </div>
            <div v-else class="button disabled --block --round">
              <span
                v-b-tooltip.hover.leftbottom="
                  $t('notCompatibleWithThisDeploymentProcess')
                "
                class="material-icons"
              >
                cloud_off
              </span>
              <span
                v-b-tooltip.hover.rightbottom="
                  $t('repositoryIsNotLabeledAsJavascript')
                "
                class="material-icons"
              >
                help_outline
              </span>
            </div>
            <div class="d-flex justify-content-center">
              <div
                v-b-tooltip.hover.leftbottom="$t('downloadThisInAzipFile')"
                class="pointer d-block"
                @click="
                  download(repo),
                    $store.dispatch('success', 'Download initiated')
                "
              >
                {{ $t('download') }}
              </div>
            </div>
            <div class="d-block pb-3 text-center font-bold-gray">
              {{ $t('lastUpdated') + ' ' }}{{ repo.updated_at | formatDate }}
            </div>
          </b-card>
        </b-col>
      </b-row>
      <Loading v-if="$store.state.loader" :enable-local-loader="true" />
      <b-row
        v-if="collection !== null && !$store.state.loader"
        class="pt-5 pb-5 justify-content-center"
      >
        <b-col align-self="center" class="text-right"
          ><div
            class="circular-btn --wrapper"
            :class="{
              '--disabled': minResults === 0,
              '--hover --dark pointer': minResults !== 0
            }"
            @click="previousPage()"
          >
            <span class="material-icons align-self-center">
              chevron_left
            </span>
          </div></b-col
        >
        <b-col align-self="center" class="text-left"
          ><div
            class="circular-btn --wrapper"
            :class="{
              '--disabled': maxResults === 100,
              '--hover --dark pointer': maxResults !== 100
            }"
            @click="nextPage()"
          >
            <span class="material-icons align-self-center">
              chevron_right
            </span>
          </div></b-col
        >
      </b-row>
    </b-container>
  </div>
</template>
<script>
import Searchbar from '@/components/blocks/app/props/Searchbar.vue'
import Loading from '~/components/blocks/app/LocalLoader.vue'
export default {
  components: {
    Searchbar,
    Loading
  },
  data: () => ({
    currentPage: 1,
    limit: 10,
    minResults: 0,
    maxResults: 10
  }),
  computed: {
    collection() {
      return this.$store.state.githubLibrary.collection
    },
    searchQuery() {
      return this.$store.getters['githubLibrary/searchQuery']
    },
    githubSearchApi() {
      return `https://api.github.com/search/repositories?sort=stars&per_page=100&page=${this.currentPage}&q=`
    }
  },
  methods: {
    search(index) {
      this.$store.commit('setGlobalLoader', true)
      this.$axios.get(this.githubSearchApi + this.searchQuery).then((r) => {
        console.log(r.data.items, 'pages')
        this.$store.commit(
          'githubLibrary/addSearchableCollection',
          r.data.items
        )
        if (r.data.items.length > 0) {
          this.$store.commit('setGlobalLoader', false)
        }
      })
    },
    add(index) {
      this.$store.commit('githubLibrary/addGithubRepositoryUri', index)
    },
    download(index) {
      this.$axios
        .get(
          `https://api.github.com/repos/${index.owner.login}/${index.name}/releases`
        )
        .then((r) => {
          const gitUri = String(r.data[0].zipball_url)
          const link = document.createElement('a')
          link.href = gitUri
          link.click()
          URL.revokeObjectURL(link.href)
        })
        .catch((e) => {
          if (e) {
            console.log(e)
            this.$store.dispatch('error', e)
          }
        })
    },
    nextPage() {
      if (this.maxResults !== 100) {
        this.minResults++
        this.maxResults++
      }
    },
    previousPage() {
      if (this.minResults !== 0) {
        this.minResults--
        this.maxResults--
      }
    }
  }
}
</script>
