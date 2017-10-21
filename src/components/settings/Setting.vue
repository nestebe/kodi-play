
<template>
  <div>
    <div class="layout-padding">
      <center v-if='noDevice' style="margin-top:10%">
        <big>Add a new  device </big>
        <div>
          <button @click='newDevice()' class="circular dark push"><i>add</i></button>
        </div>
  
      </center>
      <button v-if='!noDevice' @click='newDevice()' class="push primary push small"><i>add</i> New Device</button>
      <p v-if='!noDevice' class="caption">Devices</p>
  
      <div v-if='!noDevice' class="list">
        <label v-for="dev in devices" class="item three-lines">
          <div class="item-primary">
            <q-radio @input="changeDevice(dev.id)" v-model="deviceSelected" :val="dev.id"></q-radio>
          </div>
  
          <div class="item-content inset has-secondary">
            <div>{{dev.name}}</div>
            <div>
              <small>{{dev.ip}}:{{dev.port}}</small>
  
            </div>
          </div>
          <div class="item-secondary">
            <i>more_vert
                                   <q-popover ref="popover">
                                                  <div class="list">
                                                    <div class="item item-link" @click="editDevice(dev.id)">
                                                      <div class="item-content">Edit</div>
                                                    </div>
                                                    <div class="item item-link" @click="removeDevice(dev.id)">
                                                      <div class="item-content">Remove</div>
                                                    </div>
                                                  </div>
                                                </q-popover>
                                              </i>
          </div>
        </label>
  
      </div>
  
    </div>
  </div>
</template>

<script>


import { Utils, LocalStorage } from 'quasar'
import KodiRemote from '../../kodi/remote.js'
export default {
  data() {
    return {
      config: { id: '', ip: '', port: "8080", user: '', password: '', name: '' },
      devices: [],
      deviceSelected: '',
      option: '',
      noDevice: true
    }
  },

  methods: {
    editDevice(id) {
      this.$router.push("editDevice/" + id)
    },
    newDevice() {
      this.$router.push("editDevice/new")
    },
    saveSettings() {

    },
    changeDevice(id) {
      console.log('change device:', id)
      var _self = this
      _self.$root.db.get('device-' + id).then(function (doc) {
        LocalStorage.set("config", doc.config)
        _self.deviceSelected = doc.config.id
      }).catch(function (err) {
        console.log(err);
      });
    },
    refresh() {
      var _self = this
      _self.$root.db.allDocs({
        include_docs: true,
        startkey: 'device-'
      }).then(function (result) {
        if (result.rows.length < 1) {
          _self.noDevice = true
          LocalStorage.set("config", null)
        } else {
          console.log("result", result);
          _self.devices = []
          result.rows.forEach(function (element) {
            _self.devices.push(element.doc.config)
          });
          _self.noDevice = false
          var config = LocalStorage.get.item("config")
          if (config == null) {






          } else {
            _self.deviceSelected = config.id
          }

        }


      }).catch(function (err) {

        console.log("err", err);
      });
    },
    removeDevice(id) {
      var _self = this

      _self.$root.db.get('device-' + id).then(function (doc) {
        return _self.$root.db.remove(doc);
      }).then(function (result) {
        if (id == LocalStorage.get.item("config").id) {
          LocalStorage.set("config", null)

        }
        _self.refresh()


      }).catch(function (err) {
        console.log(err);
      });


      /*   if (LocalStorage.get.item("devices")) {
           console.log("remove")
           var devices = []
           this.devices.forEach(function (device) {
             if (device.id != id) {
               devices.push(device)
             }
   
           })
   
           LocalStorage.set("devices", devices)
           if (devices.length < 1) {
             this.noDevice = true
             LocalStorage.set("config", null)
           } else {
             LocalStorage.set("config", devices[0])
             this.deviceSelected = devices[0].id
           }
           this.devices = LocalStorage.get.item("devices")
   
         }*/

    }
  },
  mounted() {
    var _self = this
    _self.$root.db.allDocs({
      include_docs: true,
      startkey: 'device-'
    }).then(function (result) {
      if (result.rows.length < 1) {
        _self.noDevice = true
        LocalStorage.set("config", null)
      } else {
        console.log("result", result);
        result.rows.forEach(function (element) {
          _self.devices.push(element.doc.config)
        });
        _self.noDevice = false
        var config = LocalStorage.get.item("config")
        _self.deviceSelected = config.id
      }


    }).catch(function (err) {

      console.log("err", err);
    });


    /* if (LocalStorage.get.item("devices")) {
       var config = LocalStorage.get.item("config")
       _self.deviceSelected = config.id
       var devices = LocalStorage.get.item("devices")
       console.log("config: ", config)
       console.log("devices: ", devices)
       _self.devices = devices
       _self.noDevice = false
 
 
     }
     if (_self.devices.length < 1) {
       _self.noDevice = true
     }*/
  },
  updated() {
    console.log("updated")
    /*   if (LocalStorage.get.item("devices")) {
         var devices = LocalStorage.get.item("devices")
         if (devices == []) {
           this.noDevice = true
           LocalStorage.set("config", null)
         }
       }*/
  },
  beforeDestroy() {

  }
}
</script>

