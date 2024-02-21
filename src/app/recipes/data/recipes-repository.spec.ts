import { RecipesRepository } from './recipes-repository';

describe('RecipesRepository', () => {
  it('should create an instance', () => {
    expect(new RecipesRepository()).toBeTruthy();
  });
});
