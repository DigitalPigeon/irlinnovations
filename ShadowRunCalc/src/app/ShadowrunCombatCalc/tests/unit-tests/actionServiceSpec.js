describe('ActionService', function() {

    var sut;


    beforeEach(function () {

        module('starter');

        inject(function(actionService) {
            sut = actionService;
        });
    });

    describe('WHEN calling an unitialized state service', function () {

        it('SHOULD return null', function () {
            expect(sut.getLoadedActionName()).toBeNull();
        });

    });

    describe('WHEN setting a new action name', function () {

        var name = 'some randome name';

        it('SHOULD return that name', function () {
            sut.setLoadedActionName(name);
            expect(sut.getLoadedActionName()).toBe(name);
        });
    });

});