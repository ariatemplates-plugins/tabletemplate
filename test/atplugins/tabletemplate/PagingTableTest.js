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
    $classpath : "test.atplugins.tabletemplate.PagingTableTest",
    $extends : "aria.jsunit.TemplateTestCase",
    $dependencies : ["aria.utils.Dom"],
    $constructor : function () {
        this.$TemplateTestCase.constructor.call(this);
        this.domUtil = aria.utils.Dom;
        this.paginatorDiv = null;
        this.paginateFirst = null;
        this.paginatePrev  = null;
        this.paginateNext  = null;
        this.paginateLast  = null;
    },
    $destructor : function () {
        this.domUtil = null;
        this.paginatorDiv = null;
        this.paginatorDiv = null;
        this.paginateFirst = null;
        this.paginatePrev  = null;
        this.paginateNext  = null;
        this.paginateLast  = null;
        this.$TemplateTestCase.$destructor.call(this);
    },
    $prototype : {
        /**
         * Start the template test suite .
         */
        runTemplateTest : function () {
            this.__getNeededElements();

            this.assertNotEquals(null, this.paginatorDiv);

            this.assertEquals("paginator", this.paginatorDiv.className);

            this.assertEquals(7, this.paginatorDiv.children.length);

            this.assertEquals("<<", this.paginateFirst.innerText);
            this.assertEquals("<", this.paginatePrev.innerText);
            this.assertEquals(">", this.paginateNext.innerText);
            this.assertEquals(">>", this.paginateLast.innerText);

            this.assertEquals("a", this.paginatorDiv.children[2].localName);
            this.assertEquals("1-2 ", this.paginatorDiv.children[2].innerText);
            this.assertEquals("active", this.paginatorDiv.children[2].children[0].className);

            this.assertEquals("a", this.paginatorDiv.children[3].localName);
            this.assertEquals("3-4 ", this.paginatorDiv.children[3].innerText);
            this.assertEquals(0, this.paginatorDiv.children[3].children.length);

            this.assertEquals("a", this.paginatorDiv.children[4].localName);
            this.assertEquals("5-6 ", this.paginatorDiv.children[4].innerText);
            this.assertEquals(0, this.paginatorDiv.children[4].children.length);

            this.synEvent.click(this.paginateNext, {fn : "_paginateNextClicked", scope : this});
        },
        _paginateNextClicked : function() {
            this.__getNeededElements();

            this.assertEquals("a", this.paginatorDiv.children[2].localName);
            this.assertEquals("1-2 ", this.paginatorDiv.children[2].innerText);
            this.assertEquals(0, this.paginatorDiv.children[2].children.length);

            this.assertEquals("a", this.paginatorDiv.children[3].localName);
            this.assertEquals("3-4 ", this.paginatorDiv.children[3].innerText);
            this.assertEquals("active", this.paginatorDiv.children[3].children[0].className);

            this.assertEquals("a", this.paginatorDiv.children[4].localName);
            this.assertEquals("5-6 ", this.paginatorDiv.children[4].innerText);
            this.assertEquals(0, this.paginatorDiv.children[4].children.length);

            this.synEvent.click(this.paginateLast, {fn : "_paginateLastClicked", scope : this});
        },
        _paginateLastClicked : function() {
            this.__getNeededElements();

            this.assertEquals("a", this.paginatorDiv.children[2].localName);
            this.assertEquals("1-2 ", this.paginatorDiv.children[2].innerText);
            this.assertEquals(0, this.paginatorDiv.children[2].children.length);

            this.assertEquals("a", this.paginatorDiv.children[3].localName);
            this.assertEquals("3-4 ", this.paginatorDiv.children[3].innerText);
            this.assertEquals(0, this.paginatorDiv.children[3].children.length);

            this.assertEquals("a", this.paginatorDiv.children[4].localName);
            this.assertEquals("5-6 ", this.paginatorDiv.children[4].innerText);
            this.assertEquals("active", this.paginatorDiv.children[4].children[0].className);

            this.synEvent.move({
                from: {clientX: 50, clientY: 40},
                to:   {clientX: 50, clientY: 60},
                duration : 10
            }, this.paginatePrev, {fn: "_mouseMovedFirstStep", scope : this});
        },
        _mouseMovedFirstStep : function () {
            var row1 = this.domUtil.getElementById("testTable").children[1].children[0];
            this.assertEquals("row_4 even highlighted", row1.className);

            var row2 = this.domUtil.getElementById("testTable").children[1].children[1];
            this.assertEquals("row_5 odd", row2.className);

            this.synEvent.move({
                from: {clientX: 50, clientY: 60},
                to:   {clientX: 50, clientY: 80},
                duration : 10
            }, this.paginatePrev, {fn: "_mouseMovedSecondStep", scope : this});
        },
        _mouseMovedSecondStep : function () {
            this.__getNeededElements();

            var row1 = this.domUtil.getElementById("testTable").children[1].children[0];
            this.assertEquals("row_4 even", row1.className);

            var row2 = this.domUtil.getElementById("testTable").children[1].children[1];
            this.assertEquals("row_5 odd highlighted", row2.className);

            this.synEvent.click(this.paginateFirst, {fn : "_paginateFirstClicked", scope : this});
        },
        _paginateFirstClicked : function() {
            this.__getNeededElements();

            this.assertEquals("a", this.paginatorDiv.children[2].localName);
            this.assertEquals("1-2 ", this.paginatorDiv.children[2].innerText);
            this.assertEquals("active", this.paginatorDiv.children[2].children[0].className);

            this.assertEquals("a", this.paginatorDiv.children[3].localName);
            this.assertEquals("3-4 ", this.paginatorDiv.children[3].innerText);
            this.assertEquals(0, this.paginatorDiv.children[3].children.length);

            this.assertEquals("a", this.paginatorDiv.children[4].localName);
            this.assertEquals("5-6 ", this.paginatorDiv.children[4].innerText);
            this.assertEquals(0, this.paginatorDiv.children[4].children.length);

            this._endTests();
        },
        /**
         * Wrapper to end the tests.
         */
        _endTests : function () {
            this.end();
        },
        //after a refresh the references are no longer valid
        __getNeededElements : function () {
            this.paginatorDiv = this.domUtil.getElementById("target").getElementsByClassName("paginator")[0];

            this.paginateFirst = this.paginatorDiv.children[0];
            this.paginatePrev  = this.paginatorDiv.children[1];
            this.paginateNext  = this.paginatorDiv.children[5];
            this.paginateLast  = this.paginatorDiv.children[6];
        }
    }
});