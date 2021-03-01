<template>
  <v-container fluid>
    <v-row justify="center">
      <v-subheader>Developer Team</v-subheader>

      <v-expansion-panels popout>
        <v-expansion-panel v-for="(member, i) in member" :key="i" hide-actions>
          <v-expansion-panel-header>
            <v-row align="center" class="spacer" no-gutters>
              <v-col cols="4" sm="2" md="1">
                <v-avatar size="36px">
                  <img
                    v-if="member.avatar"
                    alt="Avatar"
                    :src="member.avatar"
                  />
                  <v-icon
                    v-else
                    :color="member.color"
                    v-text="member.icon"
                  ></v-icon>
                </v-avatar>
              </v-col>

              <v-col class="hidden-xs-only" sm="5" md="3">
                <strong v-html="member.name"></strong>
                <span v-if="member.total" class="grey--text">
                  &nbsp;({{ member.total }})
                </span>
              </v-col>

              <v-col class="text-no-wrap" cols="5" sm="3">
                <v-chip
                  v-if="member.new"
                  :color="`${member.color} lighten-4`"
                  class="ml-0 mr-2 black--text"
                  label
                  small
                >
                  {{ member.new }} new
                </v-chip>
                <strong v-html="member.title"></strong>
              </v-col>

              <v-col
                v-if="member.excerpt"
                class="grey--text text-truncate hidden-sm-and-down"
              >
                &mdash;
                {{ member.excerpt }}
              </v-col>
            </v-row>
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-divider></v-divider>
            <v-card-text v-text="lorem"></v-card-text>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Member",
  data() {
    return {
      member: [
        {
          avatar: "https://trello-members.s3.amazonaws.com/5d653f7b9ec8f02f380f395d/9e09599dc6fe85e8264fa8fffe9a1f6b/60.png",
          name: "สุริเยนทร์ แดงทองดี",
          title: "Welcome to Vuetify!",
          excerpt: "Thank you for joining our community...",
        },
        {
          color: "red",
          avatar:"https://trello-members.s3.amazonaws.com/5d68c8c8c71d0c4ba76aeb7c/2db520493ff95ea3dc0d9e7136beecce/60.png",
          icon: "mdi-account-multiple",
          name: "บุษรา จี้เพชรงาม",
          new: 1,
          total: 3,
          title: "Twitter",
        },
        {
          color: "teal",
          avatar:"https://trello-members.s3.amazonaws.com/5d68b1538eb3e72d507080a8/616ad40b5115b3567b3c988d9077748d/60.png",
          icon: "mdi-account-multiple",
          name: "ธนสาร กิติศุภวงศ์",
          new: 2,
          total: 4,
          title: "Shop your way",
          exceprt: "New deals available, Join Today",
        },
        {
          avatar: "https://trello-members.s3.amazonaws.com/5d48e5e1f9f2ff6d9b5b0e1a/c0381e0d56e0443ab0f515b979af2bbe/60.png",
          name: "ฐิติกานต์ เฉยบำรุง",
          title: "Welcome to Vuetify!",
          excerpt: "Thank you for joining our community...",
        },
        {
          avatar: "https://trello-members.s3.amazonaws.com/5d68af432b414b5045b01032/71a4fafac5f548bf3dcc3f6789e3bcee/60.png",
          name: "สุกัญญา ศรีเตชะ",
          title: "Welcome to Vuetify!",
          excerpt: "Thank you for joining our community...",
        },
        {
          avatar: "https://trello-members.s3.amazonaws.com/5d68b7e0aa715165cabdda4c/d4ca2c3d5f591e6c92e5e2df4a14f852/60.png",
          name: "มงคล กิจรุ่งวิริยะ",
          title: "Welcome to Vuetify!",
          excerpt: "Thank you for joining our community...",
        },
      ],
      lorem:
        "T"
    };
  },
  methods: {},
};
</script>

<style></style>
