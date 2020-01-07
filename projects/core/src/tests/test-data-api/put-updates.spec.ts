import { itAsync, Done } from "../testHelper.spec";
import { createData, CategoriesForTesting } from '../RowProvider.spec';
import { TestDataApiResponse } from '../basicRowFunctionality.spec';
import { DataApi } from '../../data-api';
import { Entity } from '../../entity';
import { NumberColumn } from '../../columns/number-column';
import { StringColumn } from '../../columns/string-column';
import { StatusColumn } from '../testModel/models';
import { Context } from '../../context';



describe("data api", () => {
    itAsync("put updates", async () => {
        let context = new Context();

        let c = await createData(async insert => insert(1, 'noam'), CategoriesForThisTest);

        var api = new DataApi(c, c.create()._getEntityApiSettings(context));
        let t = new TestDataApiResponse();
        let d = new Done();
        t.success = async (data: any) => {
          expect(data.id).toBe(1);
          expect(data.categoryName).toBe('noam 1');
          d.ok();
        };
        await api.put(t, 1, {
          categoryName: 'noam 1'
        });
        d.test();
        var x = await c.find({ where: c => c.id.isEqualTo(1) });
        expect(x[0].categoryName.value).toBe('noam 1');

    });
});

class CategoriesForThisTest extends Entity<number> implements CategoriesForTesting {
    id = new NumberColumn();
    categoryName = new StringColumn();
    description = new StringColumn();
    status = new StatusColumn();
    constructor() {
        super({
            name: undefined,
            allowApiUpdate: true
        });
    }


}