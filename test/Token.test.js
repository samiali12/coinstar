const Token = artifacts.require('./Token');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Token', ([deployer, receiver]) => {

    const name = "coinstar";
    const symbol = "CNS";
    const decimals = '18';
    const totalSupply = (1000000 * (10 * decimals)).toString();

    let token;

    beforeEach(async () => {
        token = await Token.new()
    })

    describe('deployment', () => {

        // first test case
        it('tracks the name', async () => {
            const result = await token.tokenName()
            result.should.equal(name)
        })

        // second test case
        it('tracks the symbol', async () => {
            const result = await token.symbol()
            result.should.equal(symbol)
        })

        // third test case
        it('tracks the decimals', async () => {
            const result = await token.decimals()
            result.toString().should.equal(decimals)
        })

        // fourth test case
        it('tracks the total supply', async () => {
            const result = await token.totalSupply()
            result.toString().should.equal(totalSupply)
        })
    })

    describe('sending tokens', () => {

        it('transfer token balances', async () => {
            let balanceOf;

            balanceOf = await token.balanceOf(deployer);
            console.log('deployer balance before transfer : ', balanceOf.toString());
            balanceOf = await token.balanceOf(receiver);
            console.log('deployer balance before transfer : ', balanceOf.toString());

            // transfer token
           // await token.transfer(receiver,'100000000', {from: deployer})
           await token.methods.transfer(receiver, '100000000').send({from: deployer});


            // after transfer 
            balanceOf = await token.balanceOf(deployer);
            console.log('deployer balance before transfer : ', balanceOf.toString());
            balanceOf = await token.balanceOf(receiver);
            console.log('deployer balance before transfer : ', balanceOf.toString());
        })
    })
})