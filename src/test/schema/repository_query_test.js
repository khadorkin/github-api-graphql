import { runQuery } from '../helpers/graphql_runner';
import { expect } from 'chai';
import nock from 'nock';
import { mockRepo } from '../helpers/mock';

const query = `
{
  repo(fullName: "rportugal/opencv-zbar") {
    id
    name
    full_name
    description
    private
  }
}
`;

describe('Repository query', () => {
  beforeEach(() => {
    mockRepo('rportugal/opencv-zbar');
  });

  afterEach(() => {
    nock.cleanAll();
  });

  // it('returns null if the user does not exist', async() => {
  //   const result = await runQuery(query);
  //   console.log(result);
  // });

  it('returns the base fields', async() => {
    const result = await runQuery(query);
    expect(nock.isDone()).to.equal(true, "Didn't hit all mock endpoints!");

    const repo = result.data.repo;
    expect(repo.id).to.equal(7981476);
    expect(repo.name).to.equal('opencv-zbar');
    expect(repo.full_name).to.equal('rportugal/opencv-zbar');
    expect(repo.description).to.equal('Barcode and QR Code reader using OpenCV and ZBar');
    expect(repo.private).to.equal(false);
  });
});
