import { DataBase } from '../../../app/server_app/data/DataBase';
import * as IdGenerator from '../../../app/server_app/data/IdGenerator';

type someTypeWithId = {
  id: string;
  name: string;
  color: string;
};

describe('Database test suite', () => {
  let sut: DataBase<any>;

  const fakeId = 'abc';

  const someObject1 = {
    id: '',
    name: 'testName',
    color: 'testColor',
  };

  const someObject2 = {
    id: '',
    name: 'testName',
    color: 'testColor',
  };

  beforeEach(() => {
    sut = new DataBase<someTypeWithId>();
    jest.spyOn(IdGenerator, 'generateRandomId').mockReturnValue(fakeId);
  });

  it('should return id after insert', async () => {
    const result = await sut.insert(someObject1 as someTypeWithId);

    expect(result).toBe(fakeId);
  });

  it('should get element after insert', async () => {
    const id = await sut.insert(someObject1);
    const result = await sut.getBy('id', id);

    expect(result).toBe(someObject1);
  });

  it('should find all elements with the same property', async () => {
    await sut.insert(someObject1);
    await sut.insert(someObject2);

    const expected = [someObject1, someObject2];

    const result = await sut.findAllBy('color', 'testColor');

    expect(result).toEqual(expected);
  });

  it('should change color on object', async () => {
    const id = await sut.insert(someObject1);
    const expectedColor = 'red';

    await sut.update(id, 'color', expectedColor);
    const result = await sut.getBy('id', id);
    const resultColor = result.color;

    expect(resultColor).toBe(expectedColor);
  });

  it('should delete object', async () => {
    const id = await sut.insert(someObject1);
    await sut.delete(id);

    const result = await sut.getBy('id', id);

    expect(result).toBeUndefined();
  });

  it('should get all elements', async () => {
    await sut.insert(someObject1);
    await sut.insert(someObject2);

    const expected = [someObject1, someObject2];

    const result = await sut.getAllElements();

    expect(result).toEqual(expected);
  });
});
