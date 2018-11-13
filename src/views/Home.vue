<template>
  <div>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <sub-foruns-card :items="items"/>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <sub-foruns-card :items="threads"/>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card style="padding: 10px;">
          <login three-line/>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
  
</template>

<script>
  import SubForunsCard from '../components/SubForuns'
  import Topics from '../components/Topics'
  import Login from '../components/Login'
  export default {
    components: {
      SubForunsCard,
      Topics,
      Login
    },
    async created () {
      console.log(await this.$client.getAvatars(1))
    },
    data () {
      return {
        items: [
          { header: 'Subforuns' },
          {
            avatar: 'http://forum.imguol.com/forum/themes/jogos/images/folder_new_big.gif',
            title: 'Cinema',
            subtitle: "Filmes, estreias da semana, DVDs...",
          },
          { divider: true, inset: true },
          {
            avatar: 'http://forum.imguol.com/forum/themes/jogos/images/folder_new_big.gif',
            title: 'Musica',
            subtitle: "Bandas, rock, samba e tudo mais"
          },
          { divider: true, inset: true },
          {
            avatar: 'http://forum.imguol.com/forum/themes/jogos/images/folder_new_big.gif',
            title: 'Papo-cabeça',
            subtitle: "Religião, ideologias, ciência e literatura"
          },
          { divider: true, inset: true },
          {
            avatar: 'http://j.i.uol.com.br/forum/vt.gif',
            title: 'Vale-Tudo',
            subtitle: "Entre se desejar, saia se conseguir"
          },
          { divider: true, inset: true },
          {
            avatar: 'http://forum.imguol.com/forum/themes/jogos/images/folder_new_big.gif',
            title: 'Vestibular',
            subtitle: "Fiquei compreguiçadecopiaresse"
          }
        ],
        threads: [
          { header: 'Tópicos' },
          {
            avatar: 'http://forum.imguol.com/forum/themes/jogos/images/folder_new_big.gif',
            title: 'Como tu encontrou esse fórum',
            subtitle: "User Bosta 2",
          },
          { divider: true, inset: true },
          {
            avatar: 'http://forum.imguol.com/forum/themes/jogos/images/folder_new_big.gif',
            title: 'Dei o cu e gostei',
            subtitle: "Johnson Verdura"
          },
          { divider: true, inset: true },
          {
            avatar: 'http://forum.imguol.com/forum/themes/jogos/images/folder_new_big.gif',
            title: 'Viadagem aqui não po',
            subtitle: "Argamassa"
          },
          { divider: true, inset: true },
          {
            avatar: 'http://forum.imguol.com/forum/themes/jogos/images/folder_new_big.gif',
            title: 'Ai meu piru ai meu saquinho',
            subtitle: "Kuririn Arrasador"
          },
          { divider: true, inset: true },
          {
            avatar: 'http://forum.imguol.com/forum/themes/jogos/images/folder_new_big.gif',
            title: '38 PERIFEÇÃO',
            subtitle: "Rei do Supino"
          }
        ]
      }
    }
  }
</script>
