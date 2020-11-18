import ace, {Command} from '@adonisjs/ace';
import Random from './commands/Random';

ace.addCommand(Random);

interface ErrorMessage {
    message: string;
}
const command = new Command()
ace.onError(function (error:ErrorMessage, commandName:string) {
    command.error(`${commandName} reported ${error.message} - ${command.icon('error')}`)
    
    process.exit(1)
  })

ace.wireUpWithCommander();
ace.invoke();
