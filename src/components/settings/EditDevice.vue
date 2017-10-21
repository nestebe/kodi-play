
<template>
  <div>
    <div class="layout-padding">
  
      <div class="stacked-label">
        <input v-model="config.name" class="full-width">
        <label>Device Name</label>
      </div>
  
      <div class="row">
        <div class="item multiple-lines">
          <i class="item-primary">settings</i>
          <div class="item-content">
            <div class="stacked-label">
              <input v-model="config.ip" placeholder="e.g: 192.168.1.10" class="full-width">
              <label>Ip Adress</label>
            </div>
          </div>
        </div>
        <div class="item multiple-lines">
          <i class="item-primary">settings</i>
          <div class="item-content">
            <div class="stacked-label">
              <input type="number" v-model="config.port" class="full-width">
              <label>Port</label>
            </div>
          </div>
        </div>
      </div>
  
      <div class="row">
        <div class="item multiple-lines">
          <i class="item-primary">perm_identity</i>
          <div class="item-content">
            <div class="stacked-label">
              <input v-model="config.user" class="full-width">
              <label>User (optionnal)</label>
            </div>
          </div>
        </div>
        <div class="item multiple-lines">
          <i class="item-primary">lock</i>
          <div class="item-content">
            <div class="stacked-label">
              <input v-model="config.password" class="full-width">
              <label>Password (optionnal)</label>
            </div>
          </div>
        </div>
      </div>
      <button v-if='isNewDevice' @click="saveSettings()" class="green small">
        Add this device
      </button>
       <button v-else @click="saveSettings()" class="green small">
        Save
      </button>
        <button  @click="$router.back()" class="red small">
        Cancel
      </button>
      <button v-if='false' @click="searchDevices()" class="primary small">
        Sarch devices
      </button>
  
    </div>
    <q-modal ref="modalDevices" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <q-layout>
        <div slot="header" class="toolbar">
          <button @click="$refs.modalDevices.close()">
            <i>keyboard_arrow_left</i>
          </button>
          <q-toolbar-title :padding="1">
            Select your device
          </q-toolbar-title>
        </div>
  
        <div class="layout-view">
          <div class="layout-padding">
            <div class="list">
              <div class="list-label inset">Device(s)</div>
              <div class="item two-lines" v-for="res in resultSearch">
                <div class="item-primary bg-grey-6 text-white">
                  <i>router</i>
                </div>
                <div class="item-content has-secondary">
                  <div>{{res}}</div>
                  <div>February 22, 2016</div>
                </div>
                <i class="item-secondary">done</i>
              </div>
            </div>
          </div>
        </div>
      </q-layout>
    </q-modal>
  </div>
</template>

<script>


import { Utils, LocalStorage, Toast, Loading } from 'quasar'
import KodiRemote from '../../kodi/remote.js'
export default {
  data() {
    return {
      isNewDevice: true,
      config: { id: '', ip: '', port: "8080", user: '', password: '', name: '' },
      selectDevices: [],
      device: '',
      noDevice: true,
      resultSearch: []

    }
  },

  methods: {
    addNewDevice() {
      this.$router.push("newDevice")
    },
    requestDevices(i) {
      var data = {
        'jsonrpc': '2.0',
        'method': 'JSONRPC.Ping',
        'id': 1
      }
      this.$http.jsonp('http://192.168.50.' + i + ':8080/jsonrpc?request=' + encodeURIComponent(JSON.stringify(data)), { timeout: 100 }).then(function (data) {
        console.log(data.body)
        this.resultSearch.push('192.168.50.' + i + ':8080')
        Loading.hide()
        if (i < 256) {
          this.requestDevices(i + 1)
        }
        this.$refs.modalDevices.open()
      }, function (error) {
        //  console.log('error',error)
        if (i < 256) {
          this.requestDevices(i + 1)
        }
      })
    },
    searchDevices() {

      var result = []

      Loading.show()
      this.requestDevices(1)


      //this.$refs.modalDevices.open()
    },
    saveSettings() {
      var _self = this

      if (!this.config.ip) {
        Toast.create.negative({ html: 'Invalid IP Address', timeout: 3000 })
      } else if (!this.config.port) {
        Toast.create.negative({ html: 'Invalid Port', timeout: 3000 })
      } else if (!this.config.name) {
        Toast.create.negative({ html: 'Invalid device name', timeout: 3000 })
      } else {
        //ok
        /*   LocalStorage.set("config", this.config)
           if (LocalStorage.get.item("devices")) {
             console.log("items exsist !")
             var devices = LocalStorage.get.item("devices")
             devices.push(this.config)
             console.log(devices)
             LocalStorage.set("devices", devices)
   
           } else {
             console.log("no items")
             LocalStorage.set("devices", [this.config])
           }
           console.log("add device")*/
        if (_self.isNewDevice) {
          _self.$root.db.put({
            _id: 'device-' + _self.config.id,
            config: _self.config
          }).then(function (response) {
            LocalStorage.set("config", _self.config)
            _self.$router.push("/setting")
          }).catch(function (err) {
            _self.$router.push("/setting")
            console.log(err);
          });
        } else {
          //Edit


          _self.$root.db.get('device-' + _self.config.id).then(function (doc) {
            return _self.$root.db.put({
              _id: 'device-' + _self.config.id,
              _rev: doc._rev,
              config: _self.config
            });
          }).then(function (response) {
            LocalStorage.set("config", _self.config)
            _self.$router.push("/setting")
          }).catch(function (err) {
            console.log(err);
          });


        }


      }


      // let value = LocalStorage.get.item("config")
      // console.log(value);
    }

  },
  mounted() {
    console.log('params', this.$route.params)
    var _self = this
    if (this.$route.params.id == "new") {
      //new device
      this.isNewDevice = true
      this.config.id = Utils.uid()

    } else {
      this.isNewDevice = false

      console.log('EDIT MODE')

      _self.$root.db.get('device-' + _self.$route.params.id).then(function (doc) {
        _self.config = doc.config
      }).catch(function (err) {
        console.log(err);
      });



      //   this.config.id = this.$route.params.id


    }




  },
  beforeDestroy() {

  }
}
</script>

