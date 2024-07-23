import { ITest_element_cfg } from "./test_cfg_types";

const attribute = document.createAttribute("class");
attribute.value = "hidden";

export const test_element_cfg: ITest_element_cfg = {
   which: "div",
   attrs: [attribute],
   text: "some text",
   children: [{
	  which: "div",
	  attrs: [attribute]
   }]
};

export const test_elements_cfg: ITest_element_cfg[] = [
   test_element_cfg,
   test_element_cfg,
   test_element_cfg
];
