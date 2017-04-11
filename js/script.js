  var transformProp = Modernizr.prefixed('transform');

  function Carousel3D ( el ) {
    this.element = el;
    this.rotation = 0;
  }

  Carousel3D.prototype.modify = function() {

    var i;

    this.theta = 360 / 7;

    // do some trig to figure out how big the carousel
    // is in 3D space
    this.radius = Math.round( ( this.element[ 'offsetWidth' ] / 2) / Math.tan( Math.PI / 7 ) );

    for ( i = 0; i < 7; i++ ) {
      this.element.children[i].style.backgroundColor = 'hsla(' + this.theta * i + ', 100%, 50%, 0.65)';
      // rotate panel, then push it out in 3D space
      this.element.children[i].style[ transformProp ] = 'rotateY' + '(' + this.theta * i + 'deg) translateZ(' + this.radius + 'px)';
    }

    // adjust rotation so panels are always flat
    this.rotation = Math.round( this.rotation / 360 / 7 ) * (360 / 7);

    this.transform();

  };

  Carousel3D.prototype.transform = function() {
    // push the carousel back in 3D space,
    // and rotate it
    this.element.style[ transformProp ] = 'translateZ(-' + this.radius + 'px) ' + 'rotateY' + '(' + this.rotation + 'deg)';
  };



  var init = function() {


    var carousel = new Carousel3D( document.getElementById('carousel') ),
        navButtons = document.querySelectorAll('#navigation button'),

        onNavButtonClick = function( event ){
          var increment = parseInt( event.target.getAttribute('data-increment') );
          carousel.rotation += carousel.theta * increment * -1;
          carousel.transform();
        };

    // populate on startup
    carousel.modify();

    for (var i=0; i < 2; i++) {
      navButtons[i].addEventListener( 'click', onNavButtonClick, false);
    }

    setTimeout( function(){
      document.body.addClassName('ready');
    }, 0);

  };

  window.addEventListener( 'DOMContentLoaded', init, false);


  // ########## GRAPHIQUE RADAR ##########//
var ctx = document.getElementById("myChart");
var myRadarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ["HTML5", "CSS3", "JavaScript", "SVG", "MySQLi", "PHP7", "SASS"],
      datasets: [{
        label: "",
        backgroundColor: "rgba(179,181,198,0.2)",
        borderColor: "rgba(179,181,198,1)",
        pointBackgroundColor: "rgba(179,181,198,1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#FFF",
        data: [95, 80, 65, 60, 30, 50, 30]
      }]
    },
    options: {
      tooltips: {
        bodyFontSize: 16,
      },
      responsive: true,
      scale: {
        ticks: {
          display: false,
          max: 100,
          beginAtZero: true
        }
      },
      legend: {
        display: false
      }
    }
  });
