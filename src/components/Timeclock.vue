<template>
  <form @submit.prevent="validateBeforeSubmit">
    <google-script ref="googlevue" />
    <h1>Prog Ops clock in/out</h1>

    <p>
      <label :class="{'has-error': errors.has('staffbadge') }" for="staffbadge">
        ProgOps Staff Badge
      </label>
      <br/>
      <input name="staffbadge" type="text"
        v-model="staffbadge" v-validate="'required'">
    </p>

    <p>
      <label :class="{'has-error': errors.has('position') }"  for="position">Position?</label>
      <ul>
        <li v-for="p in positions">
          <template v-if="!p.other">
            <input :id="p.value" type="radio" name="position" :value="p.value" v-model="position">
            <label :for="p.value">{{p.name}}</label>
          </template>
          <template v-else>
            <input id="position-other" type="radio" name="position" value="other" v-model="position">
            <label for="position-other">Other: <input type="text" v-model="p.name"></label>
          </template>
        </li>
      </ul>
    </p>

    <p>
      <label :class="{'has-error': errors.has('inOrOut') }"  for="inOrOut">Checking in or out?</label>
      <ul>
        <li>
          <input id="checkin" type="radio" name="inOrOut" value="in" v-model="inOrOut">
          <label for="checkin">In</label>
        </li>
        <li>
          <input id="checkout" type="radio" name="inOrOut" value="out" v-model="inOrOut">
          <label for="checkout">Out</label>
        </li>
      </ul>
    </p>

    <p>
      <label :class="{'has-error': errors.has('name') }" for="name">
        Your Name
      </label>
      <br/>
      <input name="name" type="text"
        v-model="name" v-validate="'required'">
    </p>

    <p>
      <input type="submit" value="Submit">
    </p>

    <p><pre>data: {{$data}}</pre></p>
  </form>
</template>

<script>
import Google from './Google.vue'
export default {
  name: 'timeclock',
  components: {
    'google-script': Google
  },
  created () {
    window.vvm2 = this
  },
  mounted () {
    document.querySelectorAll('input[name="staffbadge"]')
      .forEach((input) => input.addEventListener('blur', (e) => this.onStaffBadgeEntered(e)))
  },
  data () {
    return {
      staffbadge: null,
      name: null,
      position: null,
      inOrOut: null,
      positions: [
        {name: 'Friendly Radio Operator', value: 'friendly'},
        {name: 'Secondary Radio Operator', value: 'Secondary'},
        {name: 'Front Desk / Dietary Organizer', value: 'frontdesk'},
        {name: 'Tech Staff', value: 'techstaff'},
        {name: 'Toad Foxtrot', value: 'foxtrot'},
        {name: 'Toad Golf', value: 'golf'},
        {name: 'Shift Lead', value: 'shiftlead'},
        {other: true}
      ]
    }
  },
  methods: {
    validateBeforeSubmit (e) {
      this.$validator.validateAll()
      if (!this.errors.any()) {
        this.submitForm()
      }
    },
    onStaffBadgeEntered (e) {
      this.$refs.googlevue.lookupStaff(e.target.value)
        .then((staff) => this.onStaffFound(staff.name))
    },
    onStaffFound (name) {
      console.log(`name=${name}`)
      var nametag = document.querySelectorAll('input[name="name"]')
      if (name && nametag) {
        nametag[0].value = name
      }
    },
    submitForm () {
      console.log('addToSheet')
      var d = this.$data
      console.log(d)
      this.$refs.googlevue.addToSheet(d.staffbadge, d.name, d.inOrOut)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.has-error {
  color: #ff0000;
}

p {
  margin-bottom: 50px;
}
p > label {
  font-size: 18pt;
}

ul {
  width: 50em;
  margin: auto;
}
ul li {
  text-align: left;
  width: 20em;
}
ul li input[type='radio'] + label {
  display: inline-block;
  padding: 1em 0 1em 0;
  width: 15em;
}

</style>
