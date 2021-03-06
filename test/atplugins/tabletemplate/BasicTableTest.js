/*
 * Copyright 2012 Amadeus s.a.s.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

Aria.classDefinition({
    $classpath : "test.atplugins.tabletemplate.BasicTableTest",
    $extends : "aria.jsunit.TemplateTestCase",
    $dependencies : ["aria.utils.Dom"],
    $constructor : function () {
        this.$TemplateTestCase.constructor.call(this);
        this.domUtil = aria.utils.Dom;
        this.target = null;
    },
    $destructor : function () {
        this.domUtil = null;
        this.target = null;
        this.$TemplateTestCase.$destructor.call(this);
    },
    $prototype : {
        /**
         * Start the template test suite .
         */
        runTemplateTest : function () {
            this.target = this.domUtil.getElementById("testTable");

            this.assertNotEquals(null, this.target);
            this.assertEquals("TABLE", this.target.nodeName);

            var thead = this.target.children[0];
            this.assertEquals("THEAD", thead.nodeName);
            this.assertEquals("TR", thead.children[0].nodeName);
            this.assertEquals("TH", thead.children[0].children[0].nodeName);
            this.assertEquals("\nElement\n", thead.children[0].children[0].innerHTML);
            this.assertEquals("th-element", thead.children[0].children[0].className);

            var tbody = this.target.children[1];
            this.assertEquals("TBODY", tbody.nodeName);

            this.assertEquals("TR", tbody.children[0].nodeName);
            this.assertEquals("row_0 even", tbody.children[0].className);
            this.assertEquals("TD", tbody.children[0].children[0].nodeName);
            this.assertEquals("Hydrogen", tbody.children[0].children[0].innerHTML);

            this.assertEquals("TR", tbody.children[1].nodeName);
            this.assertEquals("row_1 odd", tbody.children[1].className);
            this.assertEquals("TD", tbody.children[1].children[0].nodeName);
            this.assertEquals("Helium", tbody.children[1].children[0].innerHTML);

            this._endTests();
        },
        /**
         * Wrapper to end the tests.
         */
        _endTests : function () {
            this.end();
        }
    }
});