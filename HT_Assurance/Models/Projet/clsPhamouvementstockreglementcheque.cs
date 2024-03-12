using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
namespace HT_Assurance
{
	public class clsPhamouvementstockreglementcheque
	{
		#region VARIABLES LOCALES

		private string _AG_CODEAGENCE = "";
		private string _MS_NUMPIECE= "";
		private string _AB_CODEAGENCEBANCAIRE = "";
		private string _AB_CODEAGENCEBANCAIREASSUREUR = "";
		private string _RC_NUMEROCHEQUE = "";

        private double _RC_VALEURCHEQUE = 0;

		#endregion

		#region ACCESSEURS

		public string AG_CODEAGENCE
		{
			get { return _AG_CODEAGENCE; }
			set {  _AG_CODEAGENCE = value; }
		}

		public string MS_NUMPIECE
		{
			get { return _MS_NUMPIECE; }
			set {  _MS_NUMPIECE= value; }
		}

		public string AB_CODEAGENCEBANCAIRE
		{
			get { return _AB_CODEAGENCEBANCAIRE; }
			set {  _AB_CODEAGENCEBANCAIRE = value; }
		}

		public string AB_CODEAGENCEBANCAIREASSUREUR
        {
			get { return _AB_CODEAGENCEBANCAIREASSUREUR; }
			set { _AB_CODEAGENCEBANCAIREASSUREUR = value; }
		}		

		public string RC_NUMEROCHEQUE
		{
			get { return _RC_NUMEROCHEQUE; }
			set {  _RC_NUMEROCHEQUE = value; }
		}


        public double RC_VALEURCHEQUE
        {
            get { return _RC_VALEURCHEQUE; }
            set { _RC_VALEURCHEQUE = value; }
        }


		#endregion

		#region INSTANCIATEURS

		public clsPhamouvementstockreglementcheque(){}
		
		public clsPhamouvementstockreglementcheque(clsPhamouvementstockreglementcheque clsPhamouvementstockreglementcheque)
		{
			this.AG_CODEAGENCE = clsPhamouvementstockreglementcheque.AG_CODEAGENCE;
			this.MS_NUMPIECE= clsPhamouvementstockreglementcheque.MS_NUMPIECE;
			this.AB_CODEAGENCEBANCAIRE = clsPhamouvementstockreglementcheque.AB_CODEAGENCEBANCAIRE;
			this.AB_CODEAGENCEBANCAIREASSUREUR = clsPhamouvementstockreglementcheque.AB_CODEAGENCEBANCAIREASSUREUR;
			
			this.RC_NUMEROCHEQUE = clsPhamouvementstockreglementcheque.RC_NUMEROCHEQUE;
            this.RC_VALEURCHEQUE = clsPhamouvementstockreglementcheque.RC_VALEURCHEQUE;
		}

		#endregion

	}
}
