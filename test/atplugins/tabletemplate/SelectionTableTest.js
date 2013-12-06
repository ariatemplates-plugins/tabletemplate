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
    $classpath : "test.atplugins.tabletemplate.SelectionTableTest",
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
            //Nothing selected/highlighted
            this.assertEquals("row_0 even", this.__getHydrogenRow().className);
            this.assertEquals("row_1 odd", this.__getHeliumRow().className);

            this.synEvent.click(this.__getHydrogenRow(), {fn : "_hydrogenRowSelected", scope : this});
        },
        _hydrogenRowSelected : function() {
            this.assertEquals("row_0 even selected", this.__getHydrogenRow().className);
            this.assertEquals("row_1 odd", this.__getHeliumRow().className);

            this.synEvent.click(this.__getHeliumRow(), {fn : "_heliumRowSelected", scope : this});
        },
        _heliumRowSelected : function() {
            this.assertEquals("row_0 even", this.__getHydrogenRow().className);
            this.assertEquals("row_1 odd selected", this.__getHeliumRow().className);
            
            this.synEvent.click(this.__getHeliumRow(), {fn : "_heliumRowUnSelected", scope : this});
        },
        _heliumRowUnSelected : function() {
            this.assertEquals("row_0 even", this.__getHydrogenRow().className);
            this.assertEquals("row_1 odd", this.__getHeliumRow().className);
            
            Aria.$global.Syn.type("[ctrl]", this.__getHydrogenRow());
            this.synEvent.click(this.__getHydrogenRow(), {fn : "_ctrlClickHydrogen", scope : this});
        },
        _ctrlClickHydrogen : function () {
            Aria.$global.Syn.type("[ctrl-up]", this.__getHydrogenRow());
            this.assertEquals("row_0 even selected", this.__getHydrogenRow().className);
            this.assertEquals("row_1 odd", this.__getHeliumRow().className);

            Aria.$global.Syn.type("[ctrl]", this.__getHeliumRow());
            this.synEvent.click(this.__getHeliumRow(), {fn : "_ctrlClickHelium", scope : this});
        },
        _ctrlClickHelium : function () {
            Aria.$global.Syn.type("[ctrl-up]", this.__getHeliumRow());
            this.assertEquals("row_0 even selected", this.__getHydrogenRow().className);
            this.assertEquals("row_1 odd selected", this.__getHeliumRow().className);

            this.synEvent.click(this.__getHydrogenRow(), {fn : "_clickTableToReset1", scope : this});

        },
        _clickTableToReset1 : function () {
            this.assertEquals("row_0 even", this.__getHydrogenRow().className);
            this.assertEquals("row_1 odd", this.__getHeliumRow().className);

            this.synEvent.click(this.__getHydrogenRow(), {fn : "_firstRowClicked", scope : this});
        },
        _firstRowClicked : function () {
            this.__assertRowClassName(this.__getHydrogenRow(), 0, ["selected"]);
            this.__assertRowClassName(this.__getHeliumRow(), 1, []);
            this.__assertRowClassName(this.domUtil.getElementById("testTable").children[1].children[2], 2, []);
            this.__assertRowClassName(this.domUtil.getElementById("testTable").children[1].children[3], 3, []);
            this.__assertRowClassName(this.domUtil.getElementById("testTable").children[1].children[4], 4, []);

            this.__assertRowClassName(this.domUtil.getElementById("testTable").children[1].children[5], 5, []);

            Aria.$global.Syn.type("[shift]", this.__getHydrogenRow());
            this.synEvent.click(this.domUtil.getElementById("testTable").children[1].children[4], {fn : "_secondLastRowClicked", scope : this});
        },
        _secondLastRowClicked : function () {
            Aria.$global.Syn.type("[shift-up]", this.__getHydrogenRow());
            this.__assertRowClassName(this.__getHydrogenRow(), 0, ["selected"]);
            this.__assertRowClassName(this.__getHeliumRow(), 1, ["selected"]);
            this.__assertRowClassName(this.domUtil.getElementById("testTable").children[1].children[2], 2, ["selected"]);
            this.__assertRowClassName(this.domUtil.getElementById("testTable").children[1].children[3], 3, ["selected"]);
            this.__assertRowClassName(this.domUtil.getElementById("testTable").children[1].children[4], 4, ["selected"]);

            this.__assertRowClassName(this.domUtil.getElementById("testTable").children[1].children[5], 5, []);

            this.synEvent.click(this.__getHydrogenRow(), {fn : "_clickTableToReset2", scope : this});
        },
        _clickTableToReset2 : function () {
            this.__assertRowClassName(this.__getHydrogenRow(), 0, []);
            this.__assertRowClassName(this.__getHeliumRow(), 1, []);
            this.__assertRowClassName(this.domUtil.getElementById("testTable").children[1].children[2], 2, []);
            this.__assertRowClassName(this.domUtil.getElementById("testTable").children[1].children[3], 3, []);
            this.__assertRowClassName(this.domUtil.getElementById("testTable").children[1].children[4], 4, []);

            this.__assertRowClassName(this.domUtil.getElementById("testTable").children[1].children[5], 5, []);

            this._endTests();
        },
        /**
         * Wrapper to end the tests.
         */
        _endTests : function () {
            this.end();
        },
        __getHydrogenRow : function () {
            return this.domUtil.getElementById("testTable").children[1].children[0];
        },
        __getHeliumRow : function () {
            return this.domUtil.getElementById("testTable").children[1].children[1];
        },
        __assertRowClassName : function(element, idx, classes) {
            var cssClasses = ["row_"+idx];
            if(idx % 2 === 0) {
                cssClasses.push("even");
            } else {
                cssClasses.push("odd");
            }
            cssClasses = cssClasses.concat(classes);
            this.assertEquals(cssClasses.join(" "), element.className);
        }
    }
});