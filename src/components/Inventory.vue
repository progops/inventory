<template>
  <form @submit.prevent="validateBeforeSubmit" >
    <h1>Scan inventory in or out, like laptops, radios, and headsets</h1>
    <p>
      <label :class="{'has-error': errors.has('staffbadge') }"  for="staffbadge">ProgOps Tech Badge</label>
      <input name="staffbadge" type="text" v-model="staffbadge" v-validate="'required'">
    </p>
    <p>
      <label :class="{'has-error': errors.has('checkoutbadge') }"  for="checkoutbadge">Badge of person checking out equipment</label>
      <input name="checkoutbadge" type="text" v-model="checkoutbadge" v-validate="'required'">
    </p>
    <p>
      <label :class="{'has-error': errors.has('equipment') }">Equipment barcodes</label>
      <ul>
        <li v-for="(equip, index)  in equipment">
          <input type="text" v-model="equip.barcode">
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
      <label :class="{'has-error': errors.has('callsign') }"  for="callsign">Info Desk or call sign</label>
      <ul>
        <li v-for="(callsign, index)  in callsigns">
          <template v-if="!callsign.other">
            <input :id="'callsign-'+ index" type="radio" name="callsign" value="Info 1" v-model="selectedCallsign">
            <label for="'callsign-'+ index">{{callsign.name}}</label>
          </template>
          <template v-else>
            <input id="callsign-other" type="radio" name="callsign" value="Other" v-model="selectedCallsign">
            <label for="callsign-other">Other: <input type="text" v-model="callsign.name"></label>
          </template>
        </li>
      </ul>
    </p>
    <p>
      <label :class="{'has-error': errors.has('condition') }" for="condition">Equipment Condition</label>
      <ul>
        <li>
          <input id="conditiongood" type="radio" name="condition" value="Good" v-model="condition" v-validate="'required'">
          <label for="conditiongood">Good</label>
        </li>
        <li>
          <input id="conditionbad" type="radio" name="condition" value="Other" v-model="condition" v-validate="'required'">
          <label for="conditionbad">Other: <input type="text" v-model="otherCondition"></label>
        </li>
      </ul>
    </p>
    <p>
      <input type="submit" value="Submit">
    </p>
    <!-- checkbox -->
<!--     <p>
      <input type="checkbox" v-model="checked">
      {{checked ? "yes" : "no"}}
    </p> -->
    <!-- radio buttons -->
<!--     <p>
      <input type="radio" name="picked" value="one" v-model="picked">
      <input type="radio" name="picked" value="two" v-model="picked">
      {{picked}}
    </p> -->
    <!-- select -->
<!--     <p>
      <select v-model="selected">
        <option>one</option>
        <option>two</option>
      </select>
      {{selected}}
    </p> -->
    <!-- multiple select -->
<!--     <p>
      <select v-model="multiSelect" multiple>
        <option>one</option>
        <option>two</option>
        <option>three</option>
      </select>
      {{multiSelect}}
    </p> -->
    <p><pre>data: {{$data}}</pre></p>
  </form>
</template>

<script>
export default {
  name: 'form',
  data () {
    return {
      staffbadge: null,
      checkoutbadge: null,
      inOrOut: null,
      selectedCallsign: null,
      callsigns: [
        {name: 'Info 1'},
        {other: true}
      ],
      equipment: [ {} ],
      condition: null,
      otherCondition: null
    }
  },
  methods: {
    validateBeforeSubmit (e) {
      this.$validator.validateAll()
      if (!this.errors.any()) {
        this.submitForm()
      }
    }
  }
}
// data: {
//   "inOrOut": "out",
//   "selectedCallsign": "Info 1",
//   "callsigns": [
//     {
//       "name": "Info 1"
//     },
//     {
//       "other": true
//     }
//   ],
//   "equipment": [
//     {
//       "barcode": "ARG00206FC"
//     }
//   ],
//   "condition": "Other",
//   "otherCondition": "Wigged Out"
// }
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
</style>
