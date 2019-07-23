<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="absolute-center">
          Awesome Todo
        </q-toolbar-title>
        <q-btn color="white" icon-right="account_circle" label="Login" class="absolute-right" flat to="/auth" v-if="!loggedIn"></q-btn>
        <q-btn color="white" icon-right="account_circle" label="Logout" class="absolute-right" @click="logoutUser" flat v-else></q-btn>
      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs >
        <q-route-tab v-for="nav in navs" :key="nav.label" :icon="nav.icon" :label="nav.label" :to="nav.to" />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-primary"
      :width="250"
    >
      <q-list dark>
        <q-item-label header>Essential Links</q-item-label>
        <q-item v-for="nav in navs" :key="nav.label" :to="nav.to" class="text-grey-4" exact>
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{nav.label}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      navs: [
        {
          label: 'Todo',
          icon: 'list',
          to: '/'
        },
                {
          label: 'Settings',
          icon: 'settings',
          to: '/settings'
        }
      ]
    }
  },
  methods: {
    ...mapActions('auth', ['logoutUser']),
    openURL
  },
  computed: {
    ...mapState('auth', ['loggedIn'])
  }
}
</script>

<style lang="scss">
  .q-drawer {
    .q-router-link--exact-active {
      color: white !important;
    }
  }


</style>
