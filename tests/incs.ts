const test_element_cfg = {
   which: "div",
   attrs: [{
	  attribute: "class",
	  value: "hidden"
   }],
   text: "some text",
   children: [{
	  which: "div",
	  attrs: [{
		 attribute: "class",
		 value: "child"
	  }]
   }]
};

export { test_element_cfg };
