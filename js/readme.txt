Detail des classes : 

-Engine :
  code : new Engine()
  description : classe mère
  inputs : ...
  outputs : ...
  
-Object :
  description : permet de manupluer des elements de la page
  code : new Object($id);
  inputs : x y position alpha size width height rotation
  outputs : x y coords absoluteCoords absoluteX absoluteY center absoluteCenter alpha size width height rotation 
  
-Connection :
  code : new Connection($objectA,$attrA,$objectB,$attrB,$conserveOffset);
  description : permet de relier les input et les outputs des objets 
  inputs : status
  outputs : ...
  
-Variable : 
  code : new Variable ($init)
  description : permet de manipuler des variables en référence
  inputs : value
  outputs : value
  
-Trigger :
  code : new Trigger($sign,$value,$do,$cooldown)
  description : execute un bloc de code lorsque une condition est remplie
  inputs : input
  outputs : output
  
-Operator : 
  code : new Operator($sign,$value,$round)
  description : effectue une operation simple sur une valeur
  inputs : inputX inputY inputZ value
  outputs : outputX outputY outputZ
  
-Distance :
  code : new Distance($distanceType,$round)
  description : mesure une distance entre deux points 
  inputs : pointA pointB
  outputs : distance distanceX distanceY distanceZ  
  
-UserInput :
  code : new UserInput($inputType)
  description : passe des valeurs venant de l'utilisateur ('mouse' , 'click' , 'drag' , 'scroll' , 'keyboard')
  inputs : ...
  outputs : coords
  
-Average :
  code : new Average ($averageType,$numOfDec,$round)
  description : renvoi une moyenne des données passées
  inputs : 
  outputs : 
  
-Clamp : 
  code : new Clamp($min,$max)
  description : renvoi min si n est < min et max si n > max
  inputs : input  , min , max
  outputs :  output
  
-Clock :
  code : new Clock()
  description : augmente de 1 a chaque boucle
  inputs : ...
  outputs : output
  
-Random : 
  code : new Random($coef,$round)
  description : injecte une valuer au hasard mulitipliée par un coedicient
  inputs : coef
  outputs : output
  
-Angle : 
  code : new Angle($round)
  description : renvoi un angle en fonction de trois points
  inputs : pointA , pointB , pointC (facultatif);
  outputs : angle , angleInRadians
  
-Compare :
  code : new Compare($sign) __ '<' '>' '==' '!=' '<=' '>='
  description : compare deux valeur et renvoi 0 ou 1
  inputs : A , B
  outputs : output
  
-Mobile :
  code : new Mobile() ou bien add_Mobile() qui lance ses calculs
  description : particule physique
  inputs : position , x , y , speed , mass , friction , force , time 
  outputs : coords , x , y  , speed , mass , friction , force , time
  
-Force :
  description : 
  inputs : 
  outputs : 
  
-Vector :
  description : 
  inputs : 
  outputs : 
  
-Action :
  description : 
  inputs : 
  outputs : 
  
-ActionQueue :
  description : 
  inputs : 
  outputs : 
  
-ImageSequence :
  description : 
  inputs : 
  outputs : 
  
-Multiplane :
  description : 
  inputs : 
  outputs : 
  
-Layer :
  description : 
  inputs : 
  outputs : 
  
-Camera :
  description : 
  inputs : 
  outputs : 
  
-UserInterface :
  description : 
  inputs : 
  outputs : 
  
-Panel :
  description : 
  inputs : 
  outputs : 
  
-ObjectGroup :
  description : 
  inputs : 
  outputs : 
  
-utils :

