export const test_element_cfg = {
   which: "div",
   attrs: [{
	  name: "class",
	  value: "hidden"
   }],
   text: "some text",
   children: [{
	  which: "div",
	  attrs: [{
		 name: "class",
		 value: "child"
	  }]
   }]
};

export const test_elements_cfg = [
   test_element_cfg,
   test_element_cfg,
   test_element_cfg
];
