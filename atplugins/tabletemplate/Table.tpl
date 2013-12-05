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

{Template {
    $classpath: "atplugins.tabletemplate.Table",
    $hasScript: true,
    $css : ["atplugins.tabletemplate.TableStyle"]
}}
    {createView itemsView on data.table.items/}

    {macro main()}
        {if this._cfgOk}
            {section {
                id : this.cfg.tableSectionId || this.TABLE_SECTION_ID,
                tableNav : true,
                macro : {
                    name : "writeTable"
                },
                bindRefreshTo : [{
                    to : "items",
                    inside : data.table,
                    recursive : true
                }]
            }/}
        {/if}
    {/macro}

    {macro callMacro(name, args)}
        {if this["macro_" + name]}
            ${this["macro_" + name].apply(this, args)}
        {else /}
            ${this.$logError(this.MACRO_NOT_FOUND, name)}
        {/if}
    {/macro}

    {macro writeTable()}
        {if this.cfg.filtering.active}
            {if this.cfg.filtering.macro}
                {call callMacro(this.cfg.filtering.macro, [this.itemsView]) /}
            {else /}
                {call writeFilters(this.cfg.filtering.filters) /}
            {/if}
        {/if}

        {if this.cfg.paging.active && this.cfg.paging.position == this.FILTER_POSITION_TOP}
            {call writePaginator() /}
        {/if}

        {call openTable() /}
            {call writeTableHeader() /}

            {call writeTableBody() /}
        {call closeTable() /}

        <br />

        {if this.cfg.paging.active && this.cfg.paging.position == this.FILTER_POSITION_BOTTOM}
            {call writePaginator() /}
        {/if}
    {/macro}

    {macro openTable()}
        <table {call writeTableAttributes() /} >
    {/macro}

    {macro closeTable()}
        </table>
    {/macro}

    {macro writeTableAttributes()}
        {call writeTableId() /} 
        {call writeCssClasses(this.cfg.cssClasses || []) /}
    {/macro}
    
    {macro writeTableId()}
        {if this.cfg.tableId}
            id="${this.cfg.tableId}"
        {/if}
    {/macro}

    {macro writeCssClasses(cssClasses)}
        {if cssClasses && cssClasses.length > 0}
            class="${cssClasses.join(' ')}"
        {/if}
    {/macro}

    {macro writeFilters(filters)}
        <div class="filters">
        {foreach filter inArray filters}
            {@aria:RadioButton {
                    label: filter.label,
                    keyValue : filter.keyValue,
                    onchange: {
                        fn: _wrapFilterFunction,
                        args : {"fn" : filter.fn, "view": this.itemsView}
                    },
                    bind:{
                        "value":{inside: this.cfg.filtering, to: this.FILTER_DEFAULT_BINDING_GROUP}
                    }
                }/}
        {/foreach}
        </div>
    {/macro}

    {macro writeTableHeader()}
        <thead>
            {call writeTableHeaderRowContent() /}
        </thead>
    {/macro}

    {macro openTableHeaderRow()}
        <tr>
    {/macro}
    
    {macro closeTableHeaderRow()}
        </tr>
    {/macro}

    {macro writeTableHeaderRowContent()}
        {call openTableHeaderRow() /}
        {foreach col inArray this.cfg.columns}
            {call writeTableHeaderContent(col) /}
        {/foreach}
        {call closeTableHeaderRow() /}
    {/macro}

    {macro writeTableHeaderContent(col)}
        //add default "th-columnName" css class
        {var cssClasses = ["th-"+col.name.toLowerCase()] /}
        //add provided cssClasses
        {if col.cssClasses && col.cssClasses.length > 0}
            {set cssClasses = cssClasses.concat(col.cssClasses) /}
        {/if}
        {call openTableHeader(cssClasses, col)/}
        
        {call writeHeaderRowContent(col)/}

        {call closeTableHeader(col)/}
    {/macro}

    {macro openTableHeader(cssClasses, col)}
    <th {call writeCssClasses(cssClasses) /}>
    {/macro}

    {macro writeHeaderRowContent(col)}
        {if col.sortable}
            {call createSortIndicator(this.SORTING_DEFAULT_NAME_PREFIX + col.name, col.name, col.sortFunction || this._createDefaultSortFunction(col), this.itemsView) /}
        {else /}
            ///allow header macro?
            ${col.name}
        {/if}
    {/macro}

    {macro closeTableHeader(col)}
    </th>
    {/macro}

    {macro writeTableBody()}
        <tbody>
            {call writeTableBodyContent() /}
        </tbody>
    {/macro}

    {macro writeTableBodyContent()}
        {foreach rowData inView this.itemsView}
            {call writeTableRow(rowData, rowData_info.initIndex) /}
        {/foreach}
    {/macro}

    {macro createSortIndicator(sortName, label, sortKeyGetter)}
        {@aria:SortIndicator {
            sortName: sortName,
            label: label,
            view: this.itemsView,
            sortKeyGetter: sortKeyGetter
        }/}
    {/macro}


    {macro writeTableRow(rowData, idx)}
        {var rowClass = idx % 2 == 0 ? this.EVEN_ROW_STYLECLASS : this.ODD_ROW_STYLECLASS /}
        {if rowData._tbl_selected}
            {call openTableRow(idx, ["row_"+idx, rowClass, this.SELECTED_ROW_STYLECLASS]) /}
        {else /}
            {call openTableRow(idx, ["row_"+idx, rowClass]) /}
        {/if}
        {call writeTableRowContent(rowData) /}

        {call closeTableRow(rowData, idx) /}
    {/macro}

    {macro openTableRow(rowIndex, cssClasses)}
        <tr tabindex="${rowIndex}" {call writeCssClasses(cssClasses) /} {on click { fn: takeSelection, args: {index: rowIndex} }/} {on mouseover "highlight"/} {on mouseout "unhighlight"/} data-index="${rowIndex}">
    {/macro}

    {macro writeTableRowContent(rowData)}
        {foreach col inArray this.cfg.columns}
            {if col.macro}
                {call callMacro(col.macro, [rowData]) /}
            {elseif col.value /}
                <td>${col.value(rowData)}</td>
            {/if}
        {/foreach}
    {/macro}

    {macro closeTableRow(rowData, idx)}
        </tr>
    {/macro}

    {macro writePaginator()}
        <div class="${this.PAGINATOR_DIV_STYLECLASS}">
            {call writePaginationControl(this.PAGINATOR_ACTION_FIRST, this.PAGINATOR_SYMBOL_FIRST) /}&nbsp;&nbsp;
            {call writePaginationControl(this.PAGINATOR_ACTION_PREV, this.PAGINATOR_SYMBOL_PREV) /}&nbsp;

            //ensure the view is refreshed
            ${this.itemsView.refresh()}
            {foreach page in this.itemsView.pages}
                {separator}&nbsp;|&nbsp;{/separator}
                <a {on click {fn: showPage, args: page.pageIndex}/}>
                    {if page.pageIndex == this.itemsView.currentPageIndex}
                        <span class="${this.PAGINATOR_ACTIVE_STYLECLASS}">
                    {/if}
                    ${page.firstItemNumber}-${page.lastItemNumber}
                    {if page.pageIndex == this.itemsView.currentPageIndex}
                        </span>
                    {/if}
                </a>
            {/foreach}&nbsp;

            {call writePaginationControl(this.PAGINATOR_ACTION_NEXT, this.PAGINATOR_SYMBOL_NEXT) /}&nbsp;&nbsp;
            {call writePaginationControl(this.PAGINATOR_ACTION_LAST, this.PAGINATOR_SYMBOL_LAST) /}
        </div>
    {/macro}

    {macro writePaginationControl(action, text)}
        <span class="${this.PAGINATOR_CTRL_STYLECLASS}" {on click { fn: paginate, args: action } /}>${text}</span>
    {/macro}
{/Template}
