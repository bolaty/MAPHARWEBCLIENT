using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;

namespace Core
{
    public class clsObjetEnvoi
    {
        private string _OE_A = ""; // CODE AGENCE
        private string _OE_O = ""; // CODE SOCIETE
        private string _OE_D = ""; // CODE DE CRYPTAGE
        private string _OE_X = ""; // UTILISATEUR de la base de données sur le serveur
        private string _OE_Y = ""; // OPERATEUR,utile pour le mouchard
        private string _OE_M = ""; //Facultatif,Correspond à la variable qui permet d'envoyer un code de message au serveur,afin qu'il envoi un message d'érreur que nous souhaitons nous même
        private bool _OE_Z = false; //Facultatif,Correspond à la variable qui permet de savoir si c'est
        //la première execution du logiciel ou non
        private string _OE_R = "N"; //O=Direction générale,Z=Coordination,N=Agence simple,variable globale pour savoir si c'est l'agence de reference(direction générale) de la societe,ou si il s'agit d'une coordination ou d'une agence simple.
        //O=Charge toutes les agences,Z=Charges la liste des agence uniquement de la coordination,N=Charge la seule agence elle même.
        private string _OE_E = "";//Le code zone de l'agence sélectioné
        private string _OE_J = "";//clsDeclaration.DATE_PAR_DEFAUT; // Facultatif,La date de la journée de travail
        private string _OE_S = "";// clsDeclaration.DATE_PAR_DEFAUT; // Facultatif,La date système
        private string _OE_Q = ""; // Facultatif,Le dernier exercice de l'agence
        private string _OE_U = ""; // 
        private string _OE_T = ""; // 
        private string _OE_G = ""; //Date de démmarrage du bilan de l'exercice en cours
        private string _OE_H = "";//clsDeclaration.DATE_PAR_DEFAUT; // 

        private string _OE_B = ""; // ADRESSE MAC DE LA MACHINE QUI EMET UNE REQUETE SUR UN SERVICE WEB
        private string _OE_C = ""; // CLE DE SESSION
        private string _OE_K = ""; // VERSION DE L'APK
        private string _OE_V = ""; // POINT DE VENTE
        private string _OE_Ex = ""; // Etat exercice
        private string _OE_L = ""; // Langue
        private string _OE_Cl = ""; // Code de la langue
        
        private string _OE_Ddb = ""; // Date de deut du bilan
        private string _OE_Sc = ""; // Statut de cloture de l'exercice en cours

        //Facultatif,veut dire que cette variable ne doit pas être dans la macro,mais utilisé au cas par cas
        //car c'est quand on en a besoin qu'on se rend compte de cela.

        private string[] _OE_PARAM = new string[] { "" };

        /// <summary>
        /// CODE AGENCE
        /// </summary>

        public string OE_A
        {
            get { return _OE_A; }
            set { _OE_A = value; }
        }
        /// <summary>
        /// CODE SOCIETE
        /// </summary>
        public string OE_O
        {
            get { return _OE_O; }
            set { _OE_O = value; }
        }
        /// <summary>
        /// CODE DE CRYPTAGE
        /// </summary>
        public string OE_D
        {
            get { return _OE_D; }
            set { _OE_D = value; }
        }

        /// <summary>
        /// UTILISATEUR
        /// </summary>
        public string OE_X
        {
            get { return _OE_X; }
            set { _OE_X = value; }
        }
        
        /// <summary>
        /// OPERATEUR
        /// </summary>
        public string OE_Y
        {
            get { return _OE_Y; }
            set { _OE_Y = value; }
        }
        /// <summary>
        /// CODE MESSAGE
        /// </summary>
        public string OE_M
        {
            get { return _OE_M; }
            set { _OE_M = value; }
        }
        /// <summary>
        /// PREMIERE EXECUTION DU LOGICIEL
        /// </summary>
        public bool OE_Z
        {
            get { return _OE_Z; }
            set { _OE_Z = value; }
        }
        /// <summary>
        /// AGENCE DE REFERENCE
        /// </summary>
        public string OE_R
        {
            get { return _OE_R; }
            set { _OE_R = value; }
        }

        /// <summary>
        /// Code zone de l'agence selectionné
        /// </summary>
        public string OE_E
        {
            get { return _OE_E; }
            set { _OE_E = value; }
        }
        /// <summary>
        /// La date de la journée de travail
        /// </summary>
        public string OE_J
        {
            get { return _OE_J; }
            set { _OE_J = value; }
        }
        /// <summary>
        /// La date système du serveur
        /// </summary>
        public string OE_S
        {
            get { return _OE_S; }
            set { _OE_S = value; }
        }

        /// <summary>
        /// Le dernier exercice de l'agence
        /// </summary>
        public string OE_Q
        {
            get { return _OE_Q; }
            set { _OE_Q = value; }
        }

        /// <summary>
        /// 
        /// </summary>
        public string OE_U
        {
            get { return _OE_U; }
            set { _OE_U = value; }
        }

        /// <summary>
        /// 
        /// </summary>
        public string OE_T
        {
            get { return _OE_T; }
            set { _OE_T = value; }
        }

        /// <summary>
        /// 
        /// </summary>
        public string OE_G
        {
            get { return _OE_G; }
            set { _OE_G = value; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string OE_H
        {
            get { return _OE_H; }
            set { _OE_H = value; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string OE_B
        {
            get { return _OE_B; }
            set { _OE_B = value; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string OE_C
        {
            get { return _OE_C; }
            set { _OE_C = value; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string OE_K
        {
            get { return _OE_K; }
            set { _OE_K = value; }
        }

        /// <summary>
        /// 
        /// </summary>
        public string OE_V
        {
            get { return _OE_V; }
            set { _OE_V = value; }
        }

        /// <summary>
        /// 
        /// </summary>
        public string OE_Ex
        {
            get { return _OE_Ex; }
            set { _OE_Ex = value; }
        }

        /// <summary>
        /// 
        /// </summary>
        public string OE_L
        {
            get { return _OE_L; }
            set { _OE_L = value; }
        }

        /// <summary>
        /// 
        /// </summary>
        public string OE_Cl
        {
            get { return _OE_Cl; }
            set { _OE_Cl = value; }
        }

        /// <summary>
        /// 
        /// </summary>
        public string OE_Ddb
        {
            get { return _OE_Ddb; }
            set { _OE_Ddb = value; }
        }

        /// <summary>
        /// 
        /// </summary>
        public string OE_Sc
        {
            get { return _OE_Sc; }
            set { _OE_Sc = value; }
        }

        /// <summary>
        /// PARAMETRES
        /// </summary>
        public string[] OE_PARAM
        {
            get { return _OE_PARAM; }
            set { _OE_PARAM = value; }
        }

        public clsObjetEnvoi() { }

        public clsObjetEnvoi(string OE_A, string OE_O, string OE_D, string OE_X,
            string OE_Y, string OE_M, bool OE_Z, string OE_R, string OE_E, string OE_Q, string OE_J, string OE_S, string OE_U, string OE_T, string OE_G, string OE_H, string OE_B, string OE_C, string OE_K, string OE_V, string OE_Ex, string OE_L, string OE_Cl, string OE_Ddb, string OE_Sc, string[] OE_PARAM)
        {
            this.OE_PARAM = OE_PARAM;
            this.OE_A = OE_A;
            this.OE_O = OE_O;
            this.OE_D = OE_D;
            this.OE_X = OE_X;
            this.OE_O = OE_Y;
            this.OE_D = OE_M;
            this.OE_Z = OE_Z;
            this.OE_R = OE_R;
            this.OE_E = OE_E;
            this.OE_J = OE_J;
            this.OE_S = OE_S;
            this.OE_Q = OE_Q;
            this.OE_U = OE_U;
            this.OE_T = OE_T;
            this.OE_G = OE_G;
            this.OE_H = OE_H;
            this.OE_B = OE_B;
            this.OE_C = OE_C;
            this.OE_K = OE_K;
            this.OE_V = OE_V;
            this.OE_Ex = OE_Ex;
            this.OE_L = OE_L;
            this.OE_Cl = OE_Cl;
            this.OE_Ddb = OE_Ddb;
            this.OE_Sc = OE_Sc;
        }

        public clsObjetEnvoi(clsObjetEnvoi clsObjetEnvoi)
        {
            OE_PARAM = clsObjetEnvoi.OE_PARAM;
            OE_A = clsObjetEnvoi.OE_A;
            OE_O = clsObjetEnvoi.OE_O;
            OE_D = clsObjetEnvoi.OE_D;
            OE_X = clsObjetEnvoi.OE_X;
            OE_Y = clsObjetEnvoi.OE_Y;
            OE_M = clsObjetEnvoi.OE_M;
            OE_Z = clsObjetEnvoi.OE_Z;
            OE_R = clsObjetEnvoi.OE_R;
            OE_E = clsObjetEnvoi.OE_E;
            OE_Q = clsObjetEnvoi.OE_Q;
            OE_J = clsObjetEnvoi.OE_J;
            OE_S = clsObjetEnvoi.OE_S;
            OE_U = clsObjetEnvoi.OE_U;
            OE_T = clsObjetEnvoi.OE_T;
            OE_G = clsObjetEnvoi.OE_G;
            OE_H = clsObjetEnvoi.OE_H;
            OE_B = clsObjetEnvoi.OE_B;
            OE_C = clsObjetEnvoi.OE_C;
            OE_K = clsObjetEnvoi.OE_K;
            OE_V = clsObjetEnvoi.OE_V;
            OE_Ex = clsObjetEnvoi.OE_Ex;
            OE_L = clsObjetEnvoi.OE_L;
            OE_Cl = clsObjetEnvoi.OE_Cl;
            OE_Ddb = clsObjetEnvoi.OE_Ddb;
            OE_Sc = clsObjetEnvoi.OE_Sc;
        }

        public clsObjetEnvoi SetValue(string OE_A, string OE_O, string OE_D, string OE_X,
            bool OE_Z, string OE_R, string OE_E, string OE_Q, string OE_J, string OE_S, string OE_U, string OE_T, string OE_G, string OE_H, string OE_B, string OE_C, string OE_K, string OE_V, string OE_Ex, string OE_L, string OE_Cl, string OE_Ddb, string[] OE_PARAM)
        {
            this.OE_A = OE_A;
            this.OE_O = OE_O;
            this.OE_D = OE_D;
            this.OE_X = OE_X;
            this.OE_Y = OE_Y;
            this.OE_M = OE_M;
            this.OE_Z = OE_Z;
            this.OE_R = OE_R;
            this.OE_E = OE_E;
            this.OE_J = OE_J;
            this.OE_S = OE_S;
            this.OE_Q = OE_Q;
            this.OE_U = OE_U;
            this.OE_T = OE_T;
            this.OE_G = OE_G;
            this.OE_H = OE_H;
            this.OE_B = OE_B;
            this.OE_C = OE_C;
            this.OE_K = OE_K;
            this.OE_V = OE_V;
            this.OE_Ex = OE_Ex;
            this.OE_L = OE_L;
            this.OE_Cl = OE_Cl;
            this.OE_Ddb = OE_Ddb;
            this.OE_Sc = OE_Sc;
            this.OE_PARAM = OE_PARAM;
            return this;
        }

    }
}