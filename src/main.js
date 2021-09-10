import Vue from 'vue';
import * as joint from 'jointjs';
import App from '@/App.vue';


// we need to get our own connectors
let customConnectors={
	f: function() {}
}

const Joint = {
	install: function (Vue) {
		// add the custom connectors
		// I cannot figure out what's going on here... in development, this works:
		//    _.assign(joint.connectors, customConnectors);
		// as does this:
		//	  _.each(customConnectors, (item, key) => { joint.connectors[key] = item;});
		// and this:
		//    for (const connector in customConnectors) {
		//	     joint.connectors[connector] = customConnectors[connector];
		//     }
		// but none of those work in production, saying joint is a constant or not extensible
    // this one gives a build error about f not being exported by jointjs/src/connectors
    //    joint.connectors['f'] = customConnectors['f'];
		// this one gives the same error but runs, only when minified, so I think it's actually
    //    just removing the statement 
    debugger;
    joint.connectors.f = customConnectors.f; 
		Vue.joint = joint;
	}
};
Vue.use(Joint);


Vue.config.productionTip = false;

let app = new Vue({
//  router, 
  joint,
  render: h => h(App)
}).$mount('#app');
