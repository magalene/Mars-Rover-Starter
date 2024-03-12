const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  it("constructor sets position and default values for mode and generatorWatts", function(){
    let testPosition = 9999;
    let rover = new Rover(testPosition);
    expect(rover.position).toBe(testPosition);
    expect(rover.mode).toBe('NORMAL');
    expect(rover.generatorWatts).toBe(110);
  });
  it("response returned by receiveMessage contains the name of the message", function(){
    let rover = new Rover(999);
    let message = new Message('test Name', []);
    let response = rover.receiveMessage(message);
    expect(response.message).toContain('test Name');
});
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    let messageName = 'Test Name';
    let testCommands = [new Command('command1','value1'), new Command('command2','value2')]
    let message = new Message(messageName, testCommands);
    let rover = new Rover('position');
    let response = rover.receiveMessage(message);
    expect(response.results.length).toBe(2);
  });
  it("responds correctly to the status check command",function(){
    let messageName = 'Test Name';
    let testCommands = [new Command('STATUS_CHECK')];
    let message = new Message(messageName,testCommands);
    let rover = new Rover('position', 'NORMAL', 110);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(true);
    expect(response.results[0].roverStatus.mode).toBe('NORMAL');
    expect(response.results[0].roverStatus.generatorWatts).toBe(110);
    expect(response.results[0].roverStatus.position).toBe('position');
  });
  it('responds corectly to the mode change command', function(){
    let rover = new Rover('position');
    let commands = [new Command('MODE_CHANGE')];
    let message = new Message('Test MODE_CHANGE command', commands);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(true);
    expect(rover.mode).toBe(rover.mode);
});
  it("responds with a false completed value when attempting to move in LOW_POWER mode",function(){
    let messageName = 'Test Name';
    let testCommands =  [new Command('LOW_POWER', 'position')];
    let message = new Message(messageName,testCommands);
    let rover = new Rover('position', 'LOW_POWER');
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(false);
    expect(rover.position).toBe('position');
  });
  it("responds with the position for the move command",function(){
    let messageName = 'Test Name';
    let testCommands = [new Command('MOVE', 'position')];
    let message = new Message(messageName, testCommands);
    let rover = new Rover('postion');
    let response = rover.receiveMessage(message);

    expect(response.results[0].completed).toBe(true);
    expect(rover.position).toBe('position');
    

  })
  // 7 tests here!

})
