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
	$classpath : 'extending.ExtendedTableTemplate',
	$extends : 'atplugins.tabletemplate.Table',
	$css : ["atplugins.tabletemplate.TableStyle", "SampleTemplateStyle"],
  	$hasScript : true
}}

	{macro main()}
		{call $Table.main() /}
	{/macro}

    {macro detailColMacro(rowData)}
        <td {on click "showDetails" /}>
        {if !rowData.showDetails}
            {@aria:Icon {icon:"std:expand"}/} Details
        {else /}
            {@aria:Icon {icon:"std:collapse"}/} Details
        {/if}
        </td>
    {/macro}

     //Overwrite writeTableRow method to add special detail rows below
    {macro writeTableRow(rowData, idx)}
        {call $Table.writeTableRow(rowData, idx) /}

        {call writeTableRowDetails(rowData, rowData.details) /}
    {/macro}

    {macro writeTableRowDetails(rowData, details)}
    //Detail Header
    {if !rowData.showDetails}
        <tr class="hidden detail">
    {else /}
        <tr>
	{/if}

    {call writeTableData(["smaller", "no-border"]) /}
    {call writeTableData(["smaller", "no-border"]) /}
    {call writeTableData(["smaller", "subheader"], "Density g/cm") /}
    {call writeTableData(["smaller", "subheader"], "Melting Point K") /}
    {call writeTableData(["smaller", "subheader"], "Boiling Point K") /}
    </tr>

    {if !rowData.showDetails}
        <tr class="hidden">
    {else /}
        <tr>
    {/if}

    {call writeTableData(["smaller", "no-border"]) /}
    {call writeTableData(["smaller", "no-border"]) /}
    {call writeTableData(["smaller"], details.density) /}
    {call writeTableData(["smaller"], details.melting_point) /}
    {call writeTableData(["smaller"], details.boiling_point) /}
    </tr>
    {/macro}


    {macro writeTableData(cssClasses, tableData)}
        <td {call writeCssClasses(cssClasses) /}>${tableData}</td>
    {/macro}

    {macro writeTableHeaderRowContent()}
        {call $Table.writeTableHeaderRowContent() /}
        <tr>
        {foreach col inArray this.cfg.columns}
            {call createFilterTextField(col) /}
        {/foreach}
        </tr>
    {/macro}

    {macro createFilterTextField(col)}
        <td class="tableHeader">
        {if col.name !== "Details"}
          {@aria:TextField{
              helptext : "Filter by "+ col.name,
              bind : {
                  value : {
                      inside : this.cfg.filtering,
                      to : this.toAttributeName(col.name)+"_filter"
                  }
              },
              onchange : { fn : applyFilter, args : col}
            }/}
        {/if}
        </td>
    {/macro}
{/Template}