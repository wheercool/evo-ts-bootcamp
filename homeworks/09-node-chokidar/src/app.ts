import EventEmitter from 'events';
import { DirWatcher } from './dirwatcher';
import { Importer } from './importer';

const eventEmmiter = new EventEmitter();
const dirWatcher = new DirWatcher(eventEmmiter);
const importer = new Importer(eventEmmiter);

importer.listen()
dirWatcher.watch('./data', 1000);

