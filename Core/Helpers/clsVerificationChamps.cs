using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using System.Reflection;
using Core.Helpers;

namespace Core
{
    public static class clsVerificationChamps
    {

        
        public static clsMessages VerificationChamp(String vlpChampATester,String vlpLibelleDuChampATester,String vlpTypeDuChampATester,String vlpTypeDeTestARealiser) 
        {
            //-vlpTypeDeTestARealiser=01 =>Champ obligatoire
            //-vlpTypeDeTestARealiser=02 =>Type de donnée
            //-vlpTypeDeTestARealiser=03 =>Test contreinte ??????

            //-vlpTypeDuChampATester=D =>Date
            //-vlpTypeDuChampATester=T =>Text ou chaine de caractère
            //-vlpTypeDuChampATester=N =>Numérique


            clsMessages clsMessages = new clsMessages();

            clsMessages.SL_CODEMESSAGE = "99";
            clsMessages.SL_MESSAGE = "Le test "+ vlpTypeDeTestARealiser + "est concluant"+ vlpLibelleDuChampATester+" !!! ";
            clsMessages.SL_RESULTAT = "TRUE";


            if (string.IsNullOrEmpty(vlpLibelleDuChampATester))
            {
                clsMessages.SL_CODEMESSAGE = "00";
                clsMessages.SL_MESSAGE = "Veullez préciser  le libellé du champ à tester !!!";
                clsMessages.SL_RESULTAT = "FALSE";
                return clsMessages;
            }

            if (string.IsNullOrEmpty(vlpChampATester))
            {
                clsMessages.SL_CODEMESSAGE = "00";
                clsMessages.SL_MESSAGE = "Veullez préciser  le champ à tester !!!";
                clsMessages.SL_RESULTAT = "FALSE";
                return clsMessages;
            }

            if (string.IsNullOrEmpty(vlpTypeDuChampATester))
            {
                clsMessages.SL_CODEMESSAGE = "00";
                clsMessages.SL_MESSAGE = "Veullez préciser  le type du champ à tester !!!";
                clsMessages.SL_RESULTAT = "FALSE";
                return clsMessages;
            }


            if (string.IsNullOrEmpty(vlpTypeDeTestARealiser))
            {
                clsMessages.SL_CODEMESSAGE = "00";
                clsMessages.SL_MESSAGE = "Veullez préciser le type de test à réaliser sur le champ "+ vlpLibelleDuChampATester+ "!!!";
                clsMessages.SL_RESULTAT = "FALSE";
                return clsMessages;
            }

            if (vlpTypeDeTestARealiser!="01" && vlpTypeDeTestARealiser!="02" && vlpTypeDeTestARealiser!="03" )
            {
                clsMessages.SL_CODEMESSAGE = "01";
                clsMessages.SL_MESSAGE = "Le type de test à réaliser sur le champ " + vlpLibelleDuChampATester+ "n'est pas pris en charge par le système !!! ";
                clsMessages.SL_RESULTAT = "FALSE";
                return clsMessages;
            }

            if (vlpTypeDeTestARealiser=="01" && string.IsNullOrEmpty(vlpChampATester))
            {
                clsMessages.SL_CODEMESSAGE = "01";
                clsMessages.SL_MESSAGE = "Le champ " + vlpLibelleDuChampATester+ "doit être renseigné !!! ";
                clsMessages.SL_RESULTAT = "FALSE";
                return clsMessages;
            }


            if (vlpTypeDuChampATester == "T" && vlpTypeDeTestARealiser == "02")
            {
                if (!Core.clsChaineCaractere.ClasseChaineCaractere.pvgTestLibelle(vlpLibelleDuChampATester))
                {
                    clsMessages.SL_CODEMESSAGE = "01";
                    clsMessages.SL_MESSAGE = "La taille du champ ne doit pas dépacer 150 caractères dans la zone " + vlpLibelleDuChampATester + " !!! ";
                    clsMessages.SL_RESULTAT = "FALSE";
                    return clsMessages;
                }

            }

            if (vlpTypeDuChampATester == "D" && vlpTypeDeTestARealiser == "02")
            {
                if(!Core.clsDate.ClasseDate.pvgTestSiDate(vlpChampATester))
                {
                    clsMessages.SL_CODEMESSAGE = "01";
                    clsMessages.SL_MESSAGE = "Veuillez saisir une date dans la zone " + vlpLibelleDuChampATester+ " !!! ";
                    clsMessages.SL_RESULTAT = "FALSE";
                    return clsMessages;
                }
               
            }

            if (vlpTypeDuChampATester == "N" && vlpTypeDeTestARealiser == "02")
            {
                if(!Core.clsNombreMontant.ClasseNombre.pvgIsNumeric(vlpChampATester))
                {
                    clsMessages.SL_CODEMESSAGE = "01";
                    clsMessages.SL_MESSAGE = "Veuillez saisir un nombre dans la zone " + vlpLibelleDuChampATester+ " !!! ";
                    clsMessages.SL_RESULTAT = "FALSE";
                    return clsMessages;
                }

                //if(vlpChampATester.Length>8)
                //{
                //    clsMessages.SL_CODEMESSAGE = "01";
                //    clsMessages.SL_MESSAGE = "Veuillez saisir un nombre à 8 chiffre au maximum dans la zone " + vlpLibelleDuChampATester+ " !!! ";
                //    clsMessages.SL_RESULTAT = "FALSE";
                //    return clsMessages;
                //}


               
            }




            return clsMessages;

        }





        
    }
}
