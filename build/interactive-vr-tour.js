var vrView;

// Scenes for the VR/Interactive Tour of the Clubhouse and Practice Range
var scenes = {
    lobby: {
        image: 'http://gatewaygolf.github.io/vrview/images/ggcc-360-lobby.JPG',
        preview: 'http://gatewaygolf.github.io/vrview/images/ggcc-360-lobby-preview.jpg',
        hotspots: {
            pro_shop_entrance: {
                pitch: 0,
                yaw: 120,
                radius: 0.05,
                distance: 2
            }
        }
    },
    pro_shop_entrance: {
        image: 'http://gatewaygolf.github.io/vrview/images/ggcc-360-proshop-entrance.JPG',
        preview: 'http://gatewaygolf.github.io/vrview/images/ggcc-360-proshop-entrance-preview.jpg',
        hotspots: {
            lobby: {
                pitch: 0,
                yaw: 90,
                radius: 0.05,
                distance: 2
            },
            pro_shop: {
                pitch: 0,
                yaw: 180,
                radius: 0.05,
                distance: 2
            }
        }
    },
    pro_shop: {
        image: 'http://gatewaygolf.github.io/vrview/images/ggcc-360-proshop.JPG',
        preview: 'http://gatewaygolf.github.io/vrview/images/ggcc-360-proshop-preview.jpg',
        hotspots: {
            pro_shop_entrance: {
                pitch: 0,
                yaw: 90,
                radius: 0.05,
                distance: 2
            }
        }
    }
};

function onLoad() {
    vrView = new VRView.Player('#vrview', {
      image: 'http://gatewaygolf.github.io/vrview/images/blank.png',
      preview: 'http://gatewaygolf.github.io/vrview/images/blank.png',
      is_stereo: false,
      is_autopan_off: true
    });
  
    vrView.on('ready', onVRViewReady);
    vrView.on('modechange', onModeChange);
    vrView.on('click', onHotspotClick);
    vrView.on('error', onVRViewError);
    vrView.on('getposition', onGetPosition);
  }
  
  function onVRViewReady(e) {
    console.log('onVRViewReady');
    loadScene('lobby');
  }
  
  function onModeChange(e) {
    console.log('onModeChange', e.mode);
  }
  
  function onGetPosition(e) {
    console.log(e);
  
  }
  
  function onHotspotClick(e) {
    vrView.getPosition()
    console.log('onHotspotClick', e.id);
    if (e.id) {
      loadScene(e.id);
    }
  }
  
  function loadScene(id) {
    console.log('loadScene', id);
  
    // Set the image
    vrView.setContent({
      image: scenes[id].image,
      preview: scenes[id].preview,
      is_stereo: false,
      is_autopan_off: true
    });
  
    // Add all the hotspots for the scene
    var newScene = scenes[id];
    var sceneHotspots = Object.keys(newScene.hotspots);
    for (var i = 0; i < sceneHotspots.length; i++) {
      var hotspotKey = sceneHotspots[i];
      var hotspot = newScene.hotspots[hotspotKey];
  
      vrView.addHotspot(hotspotKey, {
        pitch: hotspot.pitch,
        yaw: hotspot.yaw,
        radius: hotspot.radius,
        distance: hotspot.distance
      });
    }
  }
  
  function onVRViewError(e) {
    console.log('Error! %s', e.message);
  }
  
  window.addEventListener('load', onLoad);