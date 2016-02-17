describe('ModifierService', function() {

    var sut;


    beforeEach(function () {

        module('starter');

        inject(function (modifiersService) {
            sut = modifiersService;
        });
    });

    describe('WHEN getting all modifiers without constraints', function () {

        it('SHOULD have all modifiers', function () {
            expect(sut.all().length).toBeGreaterThan(10);
        });

        it('SHOULD add the data source for each data point', function () {
            expect(sut.all()[0].dataServiceName).toBeTruthy();
        });

    });

    describe('WHEN setting a constraint for a modifier', function () {

        
        it('SHOULD exclude modifiers as specified', function () {

            var results = sut.all(function (modifier) { return modifier.id != 1; });

            expect(sut.all().length).toBeGreaterThan(results.length);

            for (var count = 0; count < results.length; results++) {
                expect(results[count].id).not.toBe(1);
            }
        });
    });

});