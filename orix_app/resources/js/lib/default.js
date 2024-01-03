$(document).ready(function() {
  new Vue({
    el: "#app",
    data: {
      firstRRN: [],
      firstRRNView: '',
      secondRRN: [],
      secondRRNView: '',
    },
    methods: {
      firstRRNCheck: function(value) {
        if (this.isNumber(value) && this.firstRRN.length < 6) {
          this.firstRRN = value.split('').map(Number);
        } else if (value === null && this.firstRRN.length > 0) {
          this.firstRRN.pop();
        }
  
        this.firstRRNView = this.firstRRN.join('');
      },
      secondRRNCheck: function(value) {
        if (this.isNumber(value) && this.secondRRN.length < 7) {
          this.secondRRN = value.split('').map(Number);
        } else if (value === null && this.secondRRN.length > 0) {
          this.secondRRN.pop();
        }
  
        let convertStr = '';
        if (this.secondRRN.length > 0) {
          convertStr = this.secondRRN[0] + String(this.secondRRN.join('')).replace(/./g, '●').substr(1);
        }
        this.secondRRNView = convertStr;
      },
      isNumber: function(data) {
        if (/^[0-9]$/g.test(data)) {
          return true;
        } else {
          return false;
        }
      }
    }
  });
});