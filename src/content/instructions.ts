// Auto-generated from manual app texto.docx

export type InstructionBlock =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] };

export type InstructionSection = { id: string; title: string; blocks: InstructionBlock[] };

export const INSTRUCTIONS: InstructionSection[] = [
  {
    "title": "La app de Imperium — Hoja de registro",
    "id": "la-app-de-imperium-hoja-de-registro",
    "blocks": [
      {
        "type": "p",
        "text": "A continuación, te detallamos las instrucciones por si tienes alguna duda con la app. Si necesitas más información, puedes escribirnos a info@divertideas.com"
      },
      {
        "type": "p",
        "text": "Esta app es un complemento del librojuego. Sustituye a la hoja de registro en papel y sirve para llevar el control de la partida, pero no dirige el juego. El libro sigue siendo la referencia principal:"
      },
      {
        "type": "ul",
        "items": [
          "en el libro se toman las decisiones",
          "se aplican los efectos",
          "y se desarrolla la historia."
        ]
      },
      {
        "type": "p",
        "text": "La app se limita a registrar información, guardar el progreso y realizar sumas sencillas.\nLa mayoría de los datos se introducen manualmente siguiendo las indicaciones del libro. La app no interpreta reglas, no valida acciones y no toma decisiones por el jugador."
      }
    ]
  },
  {
    "title": "Pantalla de inicio",
    "id": "pantalla-de-inicio",
    "blocks": [
      {
        "type": "p",
        "text": "Desde aquí se puede crear una partida nueva, cargar una partida guardada y configurar los datos iniciales antes de empezar a jugar."
      },
      {
        "type": "p",
        "text": "Importar partida"
      },
      {
        "type": "p",
        "text": "En este apartado se encuentra la opción Importar partida."
      },
      {
        "type": "p",
        "text": "Esta opción se utiliza junto a la función Exportar partida, disponible durante la partida."
      },
      {
        "type": "ul",
        "items": [
          "Al exportar una partida, la app genera un archivo que contiene toda la información de la hoja de registro.",
          "Ese archivo se guarda en el dispositivo del jugador.",
          "Al usar Importar partida, se selecciona ese mismo archivo."
        ]
      },
      {
        "type": "p",
        "text": "Al importar:"
      },
      {
        "type": "ul",
        "items": [
          "la app carga la partida exactamente en el punto en el que se guardó"
        ]
      },
      {
        "type": "p",
        "text": "Nueva partida"
      },
      {
        "type": "p",
        "text": "Este apartado permite crear una partida nueva y definir sus valores iniciales."
      },
      {
        "type": "p",
        "text": "Tu imperio"
      },
      {
        "type": "p",
        "text": "Aquí se selecciona el imperio controlado por el jugador."
      },
      {
        "type": "p",
        "text": "Imperios rivales"
      },
      {
        "type": "p",
        "text": "Aquí se seleccionan los imperios rivales que participan en la partida."
      },
      {
        "type": "p",
        "text": "Dificultad (planetas a conquistar)"
      },
      {
        "type": "p",
        "text": "Aquí se indica cuántos planetas son necesarios para ganar la partida. La app comprueba automáticamente:"
      },
      {
        "type": "ul",
        "items": [
          "si el imperio del jugador alcanza ese número de planetas",
          "si un imperio rival alcanza ese objetivo",
          "o si todos los imperios rivales se quedan sin planetas."
        ]
      },
      {
        "type": "p",
        "text": "Empezar la partida"
      },
      {
        "type": "p",
        "text": "El botón Empezar inicia la partida con los valores seleccionados."
      }
    ]
  },
  {
    "title": "Ficha del imperio",
    "id": "ficha-del-imperio",
    "blocks": [
      {
        "type": "p",
        "text": "La ficha del imperio es la pantalla principal que usarás durante la partida.\nDesde aquí llevas el control general de tu imperio y accedes a las acciones más importantes."
      },
      {
        "type": "p",
        "text": "Barra superior: información rápida"
      },
      {
        "type": "p",
        "text": "En la parte superior de la pantalla verás una barra con la información básica del imperio:"
      },
      {
        "type": "ul",
        "items": [
          "Nombre del imperio y turno actual",
          "Número de naves",
          "Número de planetas controlados",
          "Créditos disponibles: el sistema calcula automáticamente la producción actual de todos los planetas que controla ese imperio, pero el jugador es responsable de introducir la cantidad en cada ficha de planeta. Por ejemplo, cuando empiezas la partida introduces manualmente la producción base del planeta, pero a medida que adquieres mejoras de producción debes retocar  esa cantidad."
        ]
      },
      {
        "type": "p",
        "text": "Esta barra te permite, de un solo vistazo, saber en qué situación se encuentra tu imperio en cada momento."
      },
      {
        "type": "p",
        "text": "Zona central: contenido de la ficha"
      },
      {
        "type": "p",
        "text": "Debajo de la barra superior se muestra la ficha completa del imperio, dividida en varios bloques."
      },
      {
        "type": "p",
        "text": "Dados"
      },
      {
        "type": "p",
        "text": "En la parte superior de la ficha encontrarás dos dados de seis caras."
      },
      {
        "type": "ul",
        "items": [
          "Puedes tirar un dado o los dos a la vez.",
          "Se utilizan cuando el libro te pide una tirada."
        ]
      },
      {
        "type": "p",
        "text": "La app solo muestra el resultado del dado;\nla interpretación siempre se hace siguiendo el libro."
      },
      {
        "type": "p",
        "text": "Planetas conquistados"
      },
      {
        "type": "p",
        "text": "Este bloque muestra todos los planetas que pertenecen a tu imperio."
      },
      {
        "type": "ul",
        "items": [
          "Cada casilla representa un planeta (indicado por su número del librojuego)",
          "La primera casilla corresponde siempre al mundo natal.",
          "Al pulsar una casilla accedes a la ficha de ese planeta."
        ]
      },
      {
        "type": "p",
        "text": "Aquí puedes ver rápidamente cuántos planetas controlas y acceder a ellos sin buscarlos."
      },
      {
        "type": "p",
        "text": "Flota estelar"
      },
      {
        "type": "p",
        "text": "En este bloque se muestra tu flota actual."
      },
      {
        "type": "ul",
        "items": [
          "Cada casilla representa una nave activa (cuyo número corresponde al número del librojuego, y que introduces manualmente al igual que el resto de datos).",
          "Desde aquí puedes ver cuántas naves tienes disponibles."
        ]
      },
      {
        "type": "p",
        "text": "Debajo aparece también el apartado de naves destruidas, donde se registran las pérdidas."
      },
      {
        "type": "p",
        "text": "Personajes (solo jugador)"
      },
      {
        "type": "p",
        "text": "Este bloque muestra los personajes contratados por el jugador."
      },
      {
        "type": "ul",
        "items": [
          "Solo aparece para el imperio del jugador.",
          "Cada casilla corresponde a un personaje activo (de nuevo indicado por su número, al igual que planetas y naves).",
          "Desde aquí puedes gestionar tus personajes y consultar sus efectos."
        ]
      },
      {
        "type": "p",
        "text": "Acciones disponibles"
      },
      {
        "type": "p",
        "text": "En la parte inferior derecha se muestran las acciones que puedes realizar desde esta pantalla:"
      },
      {
        "type": "ul",
        "items": [
          "Combate planetario: accede a la pantalla de combate por un planeta.",
          "Combate entre flotas: accede al combate espacial (solo para el jugador).",
          "Fin del turno: finaliza el turno actual y pasa al siguiente imperio."
        ]
      },
      {
        "type": "p",
        "text": "Estas acciones son los accesos principales para avanzar la partida."
      },
      {
        "type": "p",
        "text": "En resumen"
      },
      {
        "type": "p",
        "text": "La ficha del imperio te permite:"
      },
      {
        "type": "ul",
        "items": [
          "ver de un vistazo el estado general de tu imperio,",
          "acceder rápidamente a planetas, flotas y personajes,",
          "tirar dados cuando el libro lo requiera,",
          "y realizar las acciones principales del turno."
        ]
      },
      {
        "type": "p",
        "text": "Piensa en esta pantalla como el tablero central de tu imperio, siempre accesible durante la partida."
      }
    ]
  },
  {
    "title": "Ficha de planeta",
    "id": "ficha-de-planeta",
    "blocks": [
      {
        "type": "p",
        "text": "La ficha de planeta se utiliza para registrar manualmente toda la información de un planeta concreto durante la partida."
      },
      {
        "type": "p",
        "text": "Todos los datos de esta ficha los introduce el jugador, siguiendo las indicaciones del librojuego. La app no calcula mejoras, no interpreta nodos y no decide valores."
      },
      {
        "type": "p",
        "text": "La función automática de la app es la siguiente: al inicio de cada nuevo turno, la producción actual del planeta se suma automáticamente a los créditos del imperio al que pertenece ese planeta. De este modo, el jugador no tiene que sumar planeta por planeta cada turno."
      },
      {
        "type": "p",
        "text": "Número de planeta"
      },
      {
        "type": "p",
        "text": "Campo numérico que indica el número identificador del planeta (el correspondiente al librojuego)."
      },
      {
        "type": "p",
        "text": "Propietario"
      },
      {
        "type": "p",
        "text": "Muestra el imperio al que pertenece el planeta en ese momento."
      },
      {
        "type": "p",
        "text": "El botón Marcar como libre hace que el planeta:"
      },
      {
        "type": "ul",
        "items": [
          "deje de pertenecer a cualquier imperio;",
          "no cuente como planeta conquistado;",
          "conserve todas sus estadísticas y nodos."
        ]
      },
      {
        "type": "p",
        "text": "Estadísticas del planeta"
      },
      {
        "type": "p",
        "text": "Estos campos muestran los valores actuales del planeta.\nTodos los valores se introducen o modifican manualmente por el jugador."
      },
      {
        "type": "p",
        "text": "Producción (actual)"
      },
      {
        "type": "p",
        "text": "Campo numérico que indica la producción actual del planeta:"
      },
      {
        "type": "ul",
        "items": [
          "el jugador debe introducir aquí el valor correcto según las reglas del juego. L",
          "la app no suma automáticamente la mejora por nodos. El jugador debe cambiar el dato anterior, sumando las mejoras de producción, que se calcularán en el siguiente turno de forma automática por la app."
        ]
      },
      {
        "type": "p",
        "text": "Ejemplo:\nSi un planeta tiene producción 1 y una mejora le añade +1, el jugador debe cambiar manualmente la producción a 2. A partir de ese momento, la app sumará automáticamente 2 créditos por turno al imperio correspondiente."
      },
      {
        "type": "p",
        "text": "Ataque (actual)"
      },
      {
        "type": "p",
        "text": "Campo numérico que indica el valor de ataque actual del planeta. Si una mejora o nodo aumenta el ataque, el jugador debe modificar manualmente este valor."
      },
      {
        "type": "p",
        "text": "Defensa (actual)"
      },
      {
        "type": "p",
        "text": "Campo numérico que indica el valor de defensa actual del planeta. Si una mejora o nodo aumenta el ataque, el jugador debe modificar manualmente este valor."
      },
      {
        "type": "p",
        "text": "PR máximo"
      },
      {
        "type": "p",
        "text": "Campo numérico que indica el valor máximo de PR del planeta. De nuevo, el jugador introduce este dato."
      },
      {
        "type": "p",
        "text": "PR marcado"
      },
      {
        "type": "p",
        "text": "Campo numérico que indica el valor actual de PR del planeta. Al igual que el resto de datos, el jugador se encarga de introducirlos manualmente."
      },
      {
        "type": "p",
        "text": "Habilidad especial (texto)"
      },
      {
        "type": "p",
        "text": "Campo de texto libre para escribir la habilidad especial del planeta o cualquier anotación relevante. Este texto es solo informativo. La app no lo interpreta ni aplica efectos automáticamente."
      },
      {
        "type": "p",
        "text": "Nodos del planeta"
      },
      {
        "type": "p",
        "text": "En esta ficha aparece la ilustración del librojuego con los nodos del planeta. Para poder marcar los nodos como en el librojuego, hay que hacer lo siguiente:"
      },
      {
        "type": "p",
        "text": "Al pulsar Editar nodos, se entra en un modo de edición cuyo objetivo es dibujar/definir la red de nodos que tiene ese planeta (su “mapa” de nodos)."
      },
      {
        "type": "ul",
        "items": [
          "En el editor, los nodos se marcan manualmente.",
          "Si te equivocas, puedes corregirlo marcando de nuevo el nodo para borrarlo.",
          "Este modo sirve solo para configurar el planeta, no para comprar nodos y no afecta a los créditos del imperio."
        ]
      },
      {
        "type": "p",
        "text": "Cuando termines:"
      },
      {
        "type": "ul",
        "items": [
          "Pulsa Aceptar para confirmar. A partir de ese momento, los nodos quedan dibujados y guardados en la ficha del planeta."
        ]
      },
      {
        "type": "p",
        "text": "Una vez “dibujada” la red de nodos:"
      },
      {
        "type": "ul",
        "items": [
          "el jugador puede marcar un nodo cuando lo compra o lo activa según las reglas del librojuego; al marcarlo, el nodo queda resaltado para indicar que está activo/comprado. Si no tiene créditos para hacerlo, el sistema le informa y le impide comprarlo.",
          "si el librojuego indica que un nodo se pierde o se desactiva, el jugador puede desmarcarlo, y el resaltado desaparece."
        ]
      },
      {
        "type": "p",
        "text": "La app utiliza estos resaltados como control visual, para que el jugador vea de un vistazo qué nodos están activos."
      },
      {
        "type": "p",
        "text": "RECUERDA: marcar nodos no actualiza automáticamente la producción, el ataque o la defensa del planeta. Si un nodo mejora una estadística (por ejemplo, producción +1), el jugador debe modificar manualmente en el respectivo campo de la ficha del planeta."
      },
      {
        "type": "p",
        "text": "Planeta destruido"
      },
      {
        "type": "p",
        "text": "Si las condiciones del librojuego indican que un planeta es destruido, marca este botón. El planeta deja de estar en juego y si algún imperio lo poseía desaparece de su ficha principal."
      }
    ]
  },
  {
    "title": "Ficha de nave",
    "id": "ficha-de-nave",
    "blocks": [
      {
        "type": "p",
        "text": "La ficha de nave se utiliza para registrar manualmente toda la información de una nave concreta de la flota durante la partida. Todos los datos de esta ficha los introduce el jugador, siguiendo siempre las indicaciones del librojuego. La app no asigna valores ni aplica reglas por sí sola: guarda la información introducida y automatiza únicamente ciertos controles concretos."
      },
      {
        "type": "p",
        "text": "Número identificador de la nave"
      },
      {
        "type": "p",
        "text": "Este número corresponde al número de nave indicado en el librojuego y sirve para identificarla de forma única durante la partida. Cuando una nave es comprada:"
      },
      {
        "type": "ul",
        "items": [
          "ese número queda asociado a la flota del imperio y no puede volver a comprarse otra nave con el mismo número."
        ]
      },
      {
        "type": "p",
        "text": "Tipo de nave"
      },
      {
        "type": "p",
        "text": "Este dato lo selecciona manualmente el jugador y no modifica valores automáticamente."
      },
      {
        "type": "p",
        "text": "Coste de la nave en créditos"
      },
      {
        "type": "p",
        "text": "Este valor lo introduce manualmente el jugador, siguiendo las indicaciones del librojuego:"
      },
      {
        "type": "ul",
        "items": [
          "si el imperio no tiene créditos suficientes, la app impide la compra al pulsar el botón comprar.",
          "si el coste es 0 o se deja sin rellenar, la compra es posible aunque no haya créditos disponibles."
        ]
      },
      {
        "type": "p",
        "text": "Recuerda: Los imperios empiezan la partida con una fragata gratuita.\nBusca su número en el librojuego y, al crear su ficha:"
      },
      {
        "type": "ul",
        "items": [
          "introduce ese número en el campo Nave #; deja el coste en 0 o sin rellenar; y pulsa Comprar nave."
        ]
      },
      {
        "type": "p",
        "text": "La app permitirá añadir esta fragata inicial aunque el imperio no tenga créditos."
      },
      {
        "type": "p",
        "text": "Nota"
      },
      {
        "type": "p",
        "text": "Espacio libre para anotar cualquier aclaración sobre la nave\n(nombre propio, efecto especial, estado narrativo, etc.)"
      },
      {
        "type": "p",
        "text": "Estadísticas base de la nave (ataque base, defensa base)"
      },
      {
        "type": "p",
        "text": "Estos valores definen las capacidades de la nave. Todos se introducen manualmente por el jugador."
      },
      {
        "type": "p",
        "text": "PR máximos"
      },
      {
        "type": "p",
        "text": "Cantidad máxima de PR que puede soportar la nave."
      },
      {
        "type": "p",
        "text": "PR marcados"
      },
      {
        "type": "p",
        "text": "Cantidad de daño recibido. Cuando los PR marcados alcanzan el valor de los PR máximos, la nave queda destruida automáticamente. En ese momento:"
      },
      {
        "type": "ul",
        "items": [
          "La nave se considera destruida. Al salir de la ficha de la nave o de una pantalla de combate, aparece en el apartado Naves destruidas de la ficha general del imperio.",
          "Una nave destruida puede recuperarse con el botón “recuperar nave” y seleccionando a qué imperio se asigna."
        ]
      },
      {
        "type": "p",
        "text": "Mejoras por niveles y nodos"
      },
      {
        "type": "p",
        "text": "Las naves pueden mejorar sus capacidades mediante nodos, organizados por niveles (Nivel 1 y Nivel 2). Cada mejora de nivel requiere un número concreto de nodos, que depende del tipo de nave y viene indicado en el librojuego."
      },
      {
        "type": "p",
        "text": "Por ejemplo:"
      },
      {
        "type": "ul",
        "items": [
          "una nave puede necesitar 2 nodos para mejorar la defensa de Nivel 1;",
          "y solo 1 nodo para mejorar el ataque de ese mismo nivel."
        ]
      },
      {
        "type": "p",
        "text": "La app no determina cuántos nodos son necesarios: esa información siempre se consulta en el librojuego. Los nodos sirven para llevar un control claro de:"
      },
      {
        "type": "ul",
        "items": [
          "cuántos nodos de cada tipo se han comprado; cuántos siguen activos; y cuántos se han perdido (por ejemplo, si la nave sufre daños o efectos)."
        ]
      },
      {
        "type": "p",
        "text": "Si una nave pierde nodos, el jugador debe reducir manualmente el número indicado para reflejarlo."
      },
      {
        "type": "p",
        "text": "Cuando se alcanza el número de nodos necesario para una mejora concreta (según el libro), el jugador registra esa mejora en el campo correspondiente de Bonus aplicado (ataque o defensa)."
      },
      {
        "type": "p",
        "text": "OJO: La app no activa la mejora automáticamente. Solo guarda el número de nodos y el bonus introducido por el jugador."
      },
      {
        "type": "p",
        "text": "Habilidad especial de la nave"
      },
      {
        "type": "p",
        "text": "Este apartado se utiliza para registrar la habilidad especial de la nave. Todos los valores se introducen manualmente."
      },
      {
        "type": "p",
        "text": "Desbloqueada: Indica si la habilidad especial está disponible. Recuerda que el sistema no calcula nada, la app funciona igual que si apuntases la información en tu librojuego (a excepción del cálculo general de créditos de cada imperio)."
      },
      {
        "type": "p",
        "text": "Compra de la nave"
      },
      {
        "type": "p",
        "text": "El botón “Comprar nave” es la única forma de añadir esa nave a la flota del Imperio. Al intentar comprarla, la app:"
      },
      {
        "type": "ul",
        "items": [
          "comprueba que el imperio tenga créditos suficientes según el coste introducido",
          "comprueba que haya espacio disponible en la flota y que ese número de nave no haya sido comprado previamente.",
          "Si se puede comprar, resta automáticamente los créditos al imperio y asigna ese número de nave a la pestaña flota de la página general del imperio."
        ]
      }
    ]
  },
  {
    "title": "Combate planetario",
    "id": "combate-planetario",
    "blocks": [
      {
        "type": "p",
        "text": "La pantalla de Combate planetario se utiliza para registrar y resolver un combate por la conquista de un planeta. La resolución del combate es manual y siempre se realiza siguiendo las reglas del librojuego. La app actúa como apoyo para tiradas de dados, selección de elementos y cambio de propietario, pero no decide el resultado del combate."
      },
      {
        "type": "p",
        "text": "Tiradas de dados"
      },
      {
        "type": "p",
        "text": "En la parte superior se encuentran los controles de dados:"
      },
      {
        "type": "ul",
        "items": [
          "Tirar dado 1",
          "Tirar dado 2",
          "Tirar 2 dados"
        ]
      },
      {
        "type": "p",
        "text": "Estos botones se utilizan cuando el librojuego indica una tirada durante el combate.\nLa app muestra el resultado del dado, pero la interpretación del resultado la hace el jugador siguiendo las reglas."
      },
      {
        "type": "p",
        "text": "Personajes (solo jugador)"
      },
      {
        "type": "p",
        "text": "En este apartado se pueden seleccionar personajes contratados por el jugador para usarlos en el combate."
      },
      {
        "type": "ul",
        "items": [
          "Se selecciona un personaje del listado.",
          "Al pulsar Usar en combate, el personaje se considera utilizado."
        ]
      },
      {
        "type": "p",
        "text": "Cuando se sale de esta pantalla de combate, los personajes usados en el combate:"
      },
      {
        "type": "ul",
        "items": [
          "se eliminan de la ficha del jugador, según lo indicado por el librojuego."
        ]
      },
      {
        "type": "p",
        "text": "Este apartado solo aparece para el imperio del jugador."
      },
      {
        "type": "p",
        "text": "Selección de naves atacantes (imperio activo)"
      },
      {
        "type": "p",
        "text": "Aquí se seleccionan las naves que participan en el ataque."
      },
      {
        "type": "ul",
        "items": [
          "Nave 1: nave atacante principal (obligatoria).",
          "Nave 2: nave atacante adicional (opcional)."
        ]
      },
      {
        "type": "p",
        "text": "Al seleccionar una nave:"
      },
      {
        "type": "ul",
        "items": [
          "la app muestra su ficha para poder consultar sus datos durante el combate."
        ]
      },
      {
        "type": "p",
        "text": "La selección de naves no aplica ningún efecto automático; sirve para tener clara la composición del ataque."
      },
      {
        "type": "p",
        "text": "Planeta objetivo"
      },
      {
        "type": "p",
        "text": "En este apartado se indica el planeta que está siendo atacado."
      },
      {
        "type": "p",
        "text": "Número de planeta"
      },
      {
        "type": "p",
        "text": "Se introduce el número del planeta objetivo, tal como aparece en el librojuego. Al hacerlo, aparece la ficha del planeta. Si ya se habían introducido estadísticas para el planeta, aparecerán reflejadas."
      },
      {
        "type": "p",
        "text": "Planeta conquistado"
      },
      {
        "type": "p",
        "text": "Este botón se utiliza solo cuando el combate ha sido resuelto manualmente y el resultado es la conquista del planeta. Al pulsarlo:"
      },
      {
        "type": "ul",
        "items": [
          "la app cambia el propietario del planeta al imperio atacante,",
          "siempre que haya hueco disponible para planetas en su ficha."
        ]
      },
      {
        "type": "p",
        "text": "La app no valida si el combate se ha ganado o perdido. El jugador solo pulsa este botón cuando el librojuego indica que el planeta ha sido conquistado."
      },
      {
        "type": "p",
        "text": "Navegación"
      },
      {
        "type": "p",
        "text": "El botón Volver permite salir de la pantalla de combate y regresar a la ficha del imperio. Al salir de esta pantalla se aplican los cambios realizados (uso de personajes, daños anotados, naves destruidas, conquistas marcadas)."
      }
    ]
  },
  {
    "title": "Combate entre flotas",
    "id": "combate-entre-flotas",
    "blocks": [
      {
        "type": "p",
        "text": "La pantalla de Combate entre flotas se utiliza para registrar y resolver un combate espacial entre dos imperios. El resultado del combate se decide siempre siguiendo las reglas del librojuego. La app sirve como apoyo para tiradas de dados, selección de naves y registro de daños, pero no determina el resultado del combate."
      },
      {
        "type": "p",
        "text": "Tiradas de dados"
      },
      {
        "type": "p",
        "text": "En esta pantalla se dispone de controles para realizar tiradas:"
      },
      {
        "type": "ul",
        "items": [
          "Tirar dado 1",
          "Tirar dado 2",
          "Tirar 2 dados"
        ]
      },
      {
        "type": "p",
        "text": "Estos controles se utilizan cuando el librojuego indica una tirada durante el combate.\nLa app muestra el resultado de los dados, y el jugador aplica sus efectos según las reglas."
      },
      {
        "type": "p",
        "text": "Personajes (solo jugador)"
      },
      {
        "type": "p",
        "text": "En este apartado se pueden seleccionar personajes contratados por el jugador para usarlos en el combate."
      },
      {
        "type": "ul",
        "items": [
          "El jugador selecciona uno de sus personajes disponibles.",
          "Al usarlo en combate, el personaje queda marcado como utilizado."
        ]
      },
      {
        "type": "p",
        "text": "Al salir de esta pantalla:"
      },
      {
        "type": "ul",
        "items": [
          "los personajes usados se eliminan de la ficha del jugador, según lo indicado por el librojuego."
        ]
      },
      {
        "type": "p",
        "text": "Campo espacial (recordatorio)"
      },
      {
        "type": "p",
        "text": "Aquí se introduce el número del campo espacial donde tiene lugar el combate. Este dato sirve como recordatorio para consultar en el librojuego los efectos especiales del campo espacial correspondiente. La app no aplica automáticamente estos efectos."
      },
      {
        "type": "p",
        "text": "Selección de naves del jugador"
      },
      {
        "type": "p",
        "text": "En este apartado se seleccionan las naves del imperio del jugador que participan en el combate."
      },
      {
        "type": "ul",
        "items": [
          "Nave 1: nave principal (obligatoria).",
          "Nave 2: nave adicional (opcional)."
        ]
      },
      {
        "type": "p",
        "text": "Al seleccionar una nave:"
      },
      {
        "type": "ul",
        "items": [
          "su ficha queda disponible en esta pantalla para consultar sus valores durante el combate."
        ]
      },
      {
        "type": "p",
        "text": "Imperio atacado"
      },
      {
        "type": "p",
        "text": "Aquí se selecciona el imperio rival contra el que se combate. Una vez seleccionado el imperio atacado, se eligen sus naves participantes."
      },
      {
        "type": "p",
        "text": "Selección de naves del rival"
      },
      {
        "type": "ul",
        "items": [
          "Nave rival 1: nave principal del rival (ordenadas por potencia).",
          "Nave rival 2: nave adicional del rival (opcional)."
        ]
      },
      {
        "type": "p",
        "text": "Estas selecciones permiten identificar claramente qué naves participan en el combate."
      },
      {
        "type": "p",
        "text": "Fichas en pantalla"
      },
      {
        "type": "p",
        "text": "Durante el combate:"
      },
      {
        "type": "ul",
        "items": [
          "las fichas de las naves del jugador seleccionadas se muestran para consulta;",
          "las fichas de las naves del rival seleccionadas también están disponibles."
        ]
      },
      {
        "type": "p",
        "text": "Esto permite comprobar valores, PR y mejoras sin salir de la pantalla de combate. El combate se resuelve siguiendo las reglas sdel librojuego, sumando daño a las naves hasta que un bando se queda sin naves. Esta pantalla sirve para tener en un solo panel todas las naves y sus estadísticas."
      },
      {
        "type": "p",
        "text": "La app no calcula nada, pero al salir de la pantalla de combate las naves que hayan alcanzado el máximo de PR aparecerán como destruidas en su respectiva ficha de imperio."
      }
    ]
  },
  {
    "title": "Ficha de personaje",
    "id": "ficha-de-personaje",
    "blocks": [
      {
        "type": "p",
        "text": "La ficha de personaje se utiliza para contratar y registrar un personaje del jugador durante la partida. Los personajes solo existen para el jugador. Todos los datos se introducen manualmente, siguiendo las indicaciones del librojuego. La app guarda la información y controla condiciones básicas de contratación y uso."
      },
      {
        "type": "p",
        "text": "Tipo de personaje y nivel"
      },
      {
        "type": "p",
        "text": "Se selecciona manualmente según lo indicado en el librojuego."
      },
      {
        "type": "p",
        "text": "Número identificador del personaje."
      },
      {
        "type": "p",
        "text": "Este número corresponde al número indicado en el librojuego para ese personaje y sirve para identificarlo de forma única. Una vez contratado un personaje:"
      },
      {
        "type": "ul",
        "items": [
          "su número queda bloqueado y no puede volver a contratarse mientras el personaje siga activo;",
          "ese número vuelve a estar disponible cuando el personaje es usado en un combate y se elimina de la ficha del jugador, según las reglas del librojuego."
        ]
      },
      {
        "type": "p",
        "text": "De este modo, un mismo personaje no puede estar activo más de una vez al mismo tiempo."
      },
      {
        "type": "p",
        "text": "Coste"
      },
      {
        "type": "p",
        "text": "Este valor lo introduce el jugador siguiendo las indicaciones del librojuego."
      },
      {
        "type": "p",
        "text": "Nota"
      },
      {
        "type": "p",
        "text": "Campo de texto libre para anotar cualquier aclaración sobre el personaje\n(efectos, condiciones especiales, recordatorios, etc.). Este texto no se interpreta ni se aplica automáticamente."
      },
      {
        "type": "p",
        "text": "Contratación del personaje"
      },
      {
        "type": "p",
        "text": "El botón Contratar (resta créditos) se utiliza para añadir el personaje a la ficha del jugador. Al contratar un personaje, la app:"
      },
      {
        "type": "ul",
        "items": [
          "comprueba que el imperio tenga créditos suficientes;",
          "comprueba que el número del personaje no esté adquirido previamente.",
          "resta automáticamente los créditos y lo añade a la ficha principal del imperio del jugador.",
          "En caso de que el imperio no tenga los créditos necesarios, no permite comprarlo."
        ]
      }
    ]
  }
] as const;
