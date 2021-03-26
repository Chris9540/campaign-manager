import feathers from '@feathersjs/feathers'
import { iff, discard } from 'feathers-hooks-common';
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import io from 'socket.io-client'

export const host = process.env.API_HOST || 'http://localhost:3080'

export default (origin, storage) => {
  const socket = io(host, {
    transports: ['websocket'],
    extraHeaders: {
      origin: origin || ''
    }
  })

  const feathersClient = feathers()
    .configure(socketio(socket))
    .configure(auth({ storage }))
    .hooks({
      before: {
        all: [
          iff(
            context => ['create', 'update', 'patch'].includes(context.method),
            discard('__id', '__isTemp')
          )
        ]
      }
    });

  return feathersClient
}
