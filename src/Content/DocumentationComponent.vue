<template>
  <section>
    <prop-doc :component="documentMe"></prop-doc>
    <div>
      <ul>
        <li v-for="prop in myComponentDoc.props">
          {{ prop.name }} is a {{ prop.type }} - {{ prop.note }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import propDoc from 'propdoc';
import PracContent from './PracContent.vue';
import HomeContent from './HomeContent.vue';
import IntroToPractice from './PracContentFiles/IntroToPractice.vue';
import AdressesInMemory from './PracContentFiles/NumeralSystems/AddressesInMemory.vue';
import BaseConversion from './PracContentFiles/NumeralSystems/BaseConversion.vue';
import LinearEquation from './PracContentFiles/Equations/LinearEquation.vue';
import QuadraticEquation from './PracContentFiles/Equations/QuadraticEquation.vue';
import AddSubTo100 from './PracContentFiles/Arithmetic/AddSubTo100.vue';
import LongMultiplication from './PracContentFiles/Arithmetic/LongMultiplication.vue';
import CheckAlerts from './PracContentFiles/DevelopComponents/CheckAlerts.vue';
import Heading from './PracContentFiles/DevelopComponents/Heading.vue';
import HintFormBorder from './PracContentFiles/DevelopComponents/HintFormBorder.vue';
import HintFormBorderSmall from './PracContentFiles/DevelopComponents/HintFormBorderSmall.vue';
import Nbsp from './PracContentFiles/DevelopComponents/Nbsp.vue';

export default {
  components: {
    propDoc
  },
  data() {
    return {
      documentMe: CheckAlerts,
    }
  },
  computed: {
    myComponentDoc() {
      return propDoc.getDoc(this.documentMe) 
    }
  }
}
</script>

<style type="text/css">
  .propdoc {
    color: white;
  }
  code {
    background-color: white;
    margin: 5px 5px 5px 5px;
  }
</style>