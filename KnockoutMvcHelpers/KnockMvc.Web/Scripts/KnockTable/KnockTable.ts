﻿module KnockMvc.KnockTable {

    export class KnockoutTable<TRowData> {
        Rows = ko.observableArray<Row<TRowData>>([]);
        IsSelectable = ko.observable(false);
        CurrentRow = ko.observable<Row<TRowData>>(null);
        EmptyGridMessage = ko.observable("");
        HasAnyRow = ko.computed(() => {
            return this.Rows && this.Rows().length > 0;
        });

        IsAnySelected = ko.computed(() => {
            if (!this.Rows || this.Rows().length === 0) {
                return false;
            }

            return ko.utils.arrayFirst(this.Rows(), function (row) {
                return row.IsSelected();
            });
        });

        onRowSelected: (row: Row<TRowData>, e) => void;
        onRowAdded: (row: Row<TRowData>, e) => void;
        onRowSaved: (row: Row<TRowData>, e) => void;
        onRowDeleted: (row: Row<TRowData>, e) => void;

        //onLoad
        //onLoadMore
        //onRowAdd
        //onRowEdit
        //onRowDelete
        //onFilter
        //onSort
        //onPaging
        

        addRow = (rowData: TRowData) => {
            var row = new Row(rowData);
            this.Rows.push(row);
        }

        addRows = (rowData: TRowData[]) => {
            var underlyingArray = this.Rows();
            this.Rows.valueWillMutate();

            let observableRows: Row<TRowData>[];
            ko.utils.arrayForEach(rowData, (row) => {
                observableRows.push(new Row(row));
            });

            ko.utils.arrayPushAll(underlyingArray, observableRows);
            this.Rows.valueHasMutated();
        }

        removeAllRows = () => {
            this.CurrentRow(null);
            this.Rows.removeAll();
        }
    }

    export class Row<TRowData> {
        Data: KnockoutObservable<TRowData>;
        IsSelected = ko.observable(false);
        IsCurrent = ko.observable(false);

        constructor(data: TRowData) {
            this.Data = ko.observable(data);
        }
    }
}