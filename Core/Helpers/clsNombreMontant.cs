using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using Microsoft.VisualBasic;
namespace Core
{
    public class clsNombreMontant
    {
       #region  declaration unique de la classe

        //declaration unique de la classe clsNombre pour tout le projet
        private readonly static clsNombreMontant ClassesNombre = new clsNombreMontant();

        //constructeur privé de la classe clsDeclaration
        //empêchant l'utilisateur d'instancier lui même la classe
        private clsNombreMontant()
        {
        }
        //constructeur public de la classe fonction 
        public static clsNombreMontant ClasseNombre
        {
            get { return ClassesNombre; }
        }

        #endregion


        //FONCTION ISNUMERIC() POUR C#.NET
        public bool pvgIsNumeric(string Nombre)
        {
            int i = 0;
            int nb = 0;
            bool ok = false;
            char[] tabNombre;
            char[] unNb;
            tabNombre = Nombre.ToCharArray(0, Nombre.Length);
            for (i = 0; i < Nombre.Length; i++)
            {
                ok = false;
                while ((nb < 10) && (ok == false))
                {
                    unNb = Convert.ToString(nb).ToCharArray(0, 1);
                    if (tabNombre[i] == unNb[0])
                    {
                        ok = true;
                        nb = 0;
                    }
                    else
                    {
                        if ((i == 0) && (tabNombre[i] == '-'))
                        {
                            ok = true;
                            nb = 0;
                        }
                        else
                        {
                            ok = false;
                            nb++;
                        }
                    }
                }
            }
            return ok;
        }


        public bool pvgSiValeurNumeric(object vppObject)
        {
            if (vppObject == null)
            {
                return false;
            }
            else
            {
                double OutValue;
                return double.TryParse(vppObject.ToString().Trim(),
                System.Globalization.NumberStyles.Any,
                System.Globalization.CultureInfo.CurrentCulture, out OutValue);
            }
        }

        //'Extrait une chaine dans une autre chaîne de caractère 
        //en précisant le caractere de separation
        public double pvgRecuperationMontantMaximum(double vppTaux, double vppMontantCalcul, double vppMontantMinimum)
        {
            double vlpMontantCalculer = 0;
            vlpMontantCalculer = Math.Round((vppMontantCalcul * vppTaux) / 100);

            if (vppTaux > 0 && vppMontantMinimum > 0)
            {
                if (vlpMontantCalculer < vppMontantMinimum)
                    return vppMontantMinimum;
                else
                    return vlpMontantCalculer;
            }
            else
            {
                if (vppMontantMinimum > 0)
                {
                    return vppMontantMinimum;
                }
                else if (vppTaux > 0)
                {
                    return vlpMontantCalculer;
                }
            }
            return 0;
        }

        ///<summary>Calcul la division entre deux nombre et retourne le reste et la partie entière de la division
        ///vppNombre1=Numérateur;vppNombre2=Dénominateur</summary>
        public string[] pvgResteDivision(double vppNombre1, double vppNombre2)
        {
            string[] vlpResultat = new string[2];
            vlpResultat[0] = "0"; vlpResultat[1] = "0";
            if (vppNombre2 == 0) return vlpResultat;

            long vlpReste = 0;

            long long1 = long.Parse(vppNombre1.ToString());
            long long2 = long.Parse(vppNombre2.ToString());

            vlpResultat[0] = Math.DivRem(long1, long2, out vlpReste).ToString();
            vlpResultat[1] = vlpReste.ToString();

            return vlpResultat;
        }

        public double pvgRecuperationFraisMaximum(double vppMontant, double vppTaux, double vppFrais, double vppBorneMin, double vppBorneMax)
        {
            double vlpFraisMaximum = 0;
            //calcul des frais
            if (vppFrais > 0 && vppTaux > 0)
            {
                vlpFraisMaximum = (vppMontant * vppTaux) / 100;
                if (vlpFraisMaximum < vppFrais) vlpFraisMaximum = vppFrais;
            }
            else
            {
                if (vppFrais > 0) vlpFraisMaximum = vppFrais;
                else
                    if (vppTaux > 0) vlpFraisMaximum = (vppMontant * vppTaux) / 100;
            }

            //Test avec les bornes
            if (vppBorneMin > 0)
                if (vlpFraisMaximum < vppBorneMin) vlpFraisMaximum = vppBorneMin;
            if (vppBorneMax > 0)
                if (vlpFraisMaximum > vppBorneMax) vlpFraisMaximum = vppBorneMax;

            //Arrondis de la valeur finale
            return Math.Round(vlpFraisMaximum);
        }


        //procedure permettant de calculer la taxe
        public double pvgMontantTps(double vppMontant)
        {
            //return Math.Round((vppMontant * Core.clsDeclaration.vagParametresociete.Taxe) / 100);
            return 0;
        }


        //Permet de formater une valeur numerique avec des espace en millier
        public string pvgFormatageEnMillier(string vppValeurAFormater, string vppTypeFormat)
        {
            //voici la page d'acceuil des formatage:http://idunno.org/archive/2004/14/01/122.aspx/
            //syntaxe : String.Format("{0}", "formatting string"};
            if (vppValeurAFormater == "") return "0";
            double vlpNombre = Convert.ToDouble(vppValeurAFormater.Replace("%","").Trim());

            //if (vlpNombre == 0) return "0";

            //Formatage en millier: exemple 1 000 000
            if (String.IsNullOrEmpty(vppValeurAFormater.Trim())) return "";
            //if (!clsFonctions.ClasseFonctions.pvgIsNumeric(vppValeurAFormater)) return "0";
            if (vppValeurAFormater == "0" || vppValeurAFormater == "00,00" || vppValeurAFormater == "0,0000") return "0";
            if (vppTypeFormat == "M")
            {
                //if (double.Parse(vppValeurAFormater) < 10) return vppValeurAFormater; 
                { return String.Format("{0:0,0}", double.Parse(vppValeurAFormater)); }
            }
            //formatage des poucentages: exemple 18,24
            if (vppTypeFormat == "P") 
            {
                ////if (int.Parse(vppValeurAFormater) < 10) return vppValeurAFormater;
                //{ return String.Format("{0:00.00}", double.Parse(vppValeurAFormater)); }
            }
            //formatage des poucentages: exemple 18,245
            if (vppTypeFormat == "P3")
            {
                //if (int.Parse(vppValeurAFormater) < 10) return vppValeurAFormater;
                { return String.Format("{0:00.000}", double.Parse(vppValeurAFormater)); }
            }
            //formatage des poucentages avec le signe %: exemple 36,53%
            //if (vppTypeFormat == "%") { return String.Format("{0:0%}", double.Parse(vppValeurAFormater)); }
            return "";
        }

        //Permet de faire une saisir un numérique dans une grille
        public void pvgSaisirNumeriqueGrille(object sender, KeyPressEventArgs e)
        {
            char vsDecimalSeparator = char.Parse(System.Threading.Thread.CurrentThread.CurrentCulture.NumberFormat.NumberDecimalSeparator);
            char vlpCharPoint = char.Parse(".");
            char vlpCharVirgule = char.Parse(",");
            string vapSaisie = "";

            if (Strings.Asc(e.KeyChar.ToString()) == Strings.Asc(vlpCharPoint.ToString()) && vsDecimalSeparator != vlpCharPoint)
                e.KeyChar = vlpCharVirgule;
            //

            e.Handled = !(char.IsNumber(e.KeyChar) || char.IsControl(e.KeyChar) || e.KeyChar == vsDecimalSeparator);
            vapSaisie = ((DataGridViewTextBoxEditingControl)sender).Text;


            if ((Strings.InStr(vapSaisie, vsDecimalSeparator.ToString(), CompareMethod.Text) > 0) && (e.KeyChar == vsDecimalSeparator))
                e.Handled = true;
            else
            {
                if (vsDecimalSeparator != Microsoft.VisualBasic.Strings.Asc(vlpCharPoint) & e.KeyChar == Microsoft.VisualBasic.Strings.Asc(vlpCharVirgule))
                {
                    e.KeyChar = vsDecimalSeparator;
                }
            }
        }

    }
}
