<template>
  <div
    id="e3"
    class="grey lighten-3"
  >
    <v-toolbar color="red accent-2">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">My Class next term</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <!--<v-card>-->
      <v-container
        align-center
        text-xs-center
      >
        <v-layout row wrap>
          <v-flex xs12 >

            <v-layout >
              <v-flex class="my-flex" v-for="day in days" :key="day.id">
                <v-card dark class="white--text">
                  <v-card-text class="px-0">
                    {{ day.title }}
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>



          <v-flex  xs12  v-for="time in times" :key="time.id">

            <v-layout row wrap>

              <v-flex class="my-flex" >
              <v-card dark class="white--text">
                <v-card-text class="px-0">
                  {{time.start}} - {{time.end}} {{time.id}}
                </v-card-text>
              </v-card>
            </v-flex>

              <v-flex  class="my-flex" v-for="index in 7">
                <v-card dark class="white--text">
                  <v-card-text class="px-0">
                    {{nestedlist[time.id][index-1]}}
                  </v-card-text>
                </v-card>
              </v-flex>


            </v-layout>

          </v-flex>

            </v-flex>

        </v-layout>
      </v-container>

    <!--</v-card>-->
  </div>
</template>

<script>
    export default {
      data () {
        return {
          days: [
            {
              'id': 0,
              'title': 'Day'
            }, {
              'id': 1,
              'title': 'Monday'
            }, {
              'id': 2,
              'title': 'Tuesday'
            }, {
              'id': 3,
              'title': 'Wednesday'
            }, {
              'id': 4,
              'title': 'Thursday'
            }, {
              'id': 5,
              'title': 'Friday'
            }, {
              'id': 6,
              'title': 'Saturday'
            }, {
              'id': 7,
              'title': 'Sunday'
            }
          ],
          times: [
            {
              'id': 0,
              'start': '08:00',
              'end': '10:00'
            }, {
              'id': 1,
              'start': '10:00',
              'end': '12:00'
            }, {
              'id': 2,
              'start': '12:00',
              'end': '14:00'
            }, {
              'id': 3,
              'start': '14:00',
              'end': '16:00'
            }, {
              'id': 4,
              'start': '16:00',
              'end': '18:00'
            }, {
              'id': 5,
              'start': '18:00',
              'end': '20:00'
            }
          ],
          time: '10:00 - 12:00',
          fakeData: [
            {
              day: ['Thursday,Friday'],
              time: ['10:00 - 12:00'],
              cid: 'ICCS105'
            }
          ],
          dateToIndex: {
            Monday: 0,
            Tuesday: 1,
            Wednesday: 2,
            Thursday: 3,
            Friday: 4,
            Saturday: 5,
            Sunday: 6
          }
        }
      },
      mounted () {
        console.log(this.nestedlist[this.times[0].id][0])
        console.log(this.nestedlist[this.times[4].id][0])
        console.log('Dictionary map Thursday  to : ', this.dateToIndex['Thursday'])
        console.log(this.fakeData.length)
        console.log(this.time.indexOf(':'))
        console.log(this.time.substring(0, 2))
      },
      methods: {
        setTable (courses) {
          this.fakeData = courses
        }
      },
      computed: {
        nestedlist () {
          let temp = [['.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.']]
          for (let i = 0; i < this.fakeData.length; i++) {
            for (let y = 0; y < this.fakeData[i].time.length; y++) {
              let temptime = (((parseInt(this.fakeData[i].time[y].substring(0, this.fakeData[i].time[y].indexOf(':')))) - 8) / 2)
              for (let j = 0; j < this.fakeData[i].day.length; j++) {
                let dateIndex = this.dateToIndex[this.fakeData[i].day[j]]
                temp[temptime][dateIndex] = this.fakeData[i].cid
              }
            }
          }
          return temp
        }
      }
    }
</script>

<style scoped>
  .my-flex{
    padding: 0px;
    width: 100px;
    margin-bottom: 0;
    margin-left: 1px;
    margin-right: 1px;
    color: lightblue;
  }
</style>
