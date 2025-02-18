using Core.Request;
using log4net;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http.Headers;
using System.Reflection;
using System.Web.Script.Serialization;
using System.Windows.Forms;

namespace Core
{
    /// <summary>
    /// Objet d'appel et de retour d'un service web
    /// </summary>
    public class clsAppelServiceWeb
    {
        // static ILog Log = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);

        /// <summary>
        /// Methode d'excution d'un service web
        /// </summary>
        /// <typeparam name="K">L'objet retour du service Web</typeparam>
        /// <typeparam name="T">L'objet d'envoi du service web</typeparam>
        /// <param name="data">L'objet retour passé en paramete</param>
        /// <param name="clsObjetEnvoiEditionDTO">L'objet d'envoi passé en parametre</param>
        /// <param name="method">Le type d'envoi de la requete</param>
        /// <param name="url">L'Url du service web</param>
        /// <returns></returns>
        /// 
        //public static IList<K> ExecuteServiceWeb<K, T>(K data, T Objet, string method, int timeOut ,string url, string Tokken)
        //{

        //    List<K> objList = new List<K>();

        //    var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
        //    httpWebRequest.ContentType = "application/json";
        //    httpWebRequest.Method = method;
        //    httpWebRequest.Headers.Add("Authorization", Tokken);
        //    // GESTION DE TIMOUT

        //    if (timeOut == 0)
        //    {
        //        httpWebRequest.Timeout = clsDeclaration.TIMEOUT;
        //    }
        //    else
        //    {
        //        httpWebRequest.Timeout = timeOut;
        //    }

        //    httpWebRequest.KeepAlive = true;
        //    try
        //    {
        //        using (var streamWriterConsultation = new StreamWriter(httpWebRequest.GetRequestStream()))
        //        {
        //            string jsonConsultation = new JavaScriptSerializer().Serialize(new
        //            {
        //                Objet
        //            });
        //             streamWriterConsultation.Write(jsonConsultation);
        //        }
        //        if (IsNetworkConnected())
        //        {
        //            ServicePointManager.CertificatePolicy = new TrustAllCertificatePolicy();
        //            var httpResponseConsultation = (HttpWebResponse)httpWebRequest.GetResponse();
        //            using (var streamReaderConsultation = new StreamReader(httpResponseConsultation.GetResponseStream()))
        //            {
        //                string resultConsultation = streamReaderConsultation.ReadToEnd();
        //                objList = JsonConvert.DeserializeObject<List<K>>(resultConsultation);
        //            }
        //        }
        //        else
        //            objList = null;


        //    }
        //    catch (WebException e)
        //    {
        //        //+++++Log                                                                                                          
        //        Core.clsLog.EcrireDansFichierLog("Error clsAppelServiceWeb :" + e.Message);
        //    }
        //    catch (Exception ex)
        //    {
        //        //+++++Log                                                                                                          
        //        Core.clsLog.EcrireDansFichierLog("Error clsAppelServiceWeb :" + ex.Message);
        //    }

        //    return objList;            
        //}

        public static IList<K> ExecuteServiceWeb<K, T>(K data, T Objet, string method, int timeOut, string url, string Tokken)
        {
            List<K> objList = new List<K>();

            var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Method = method;
            httpWebRequest.Headers.Add("Authorization", Tokken);

            // GESTION DE TIMEOUT
            if (timeOut == 0)
            {
                httpWebRequest.Timeout = System.Threading.Timeout.Infinite; //clsDeclaration.TIMEOUT;
            }
            else if (timeOut < 0)
            {
                // Si timeOut est négatif, attendre indéfiniment
                httpWebRequest.Timeout = System.Threading.Timeout.Infinite;
            }
            else
            {
                httpWebRequest.Timeout = timeOut;
            }

            httpWebRequest.KeepAlive = true;

            try
            {
                using (var streamWriterConsultation = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    string jsonConsultation = new JavaScriptSerializer().Serialize(new
                    {
                        Objet
                    });
                    streamWriterConsultation.Write(jsonConsultation);
                }

                if (IsNetworkConnected())
                {
                    ServicePointManager.CertificatePolicy = new TrustAllCertificatePolicy();
                    var httpResponseConsultation = (HttpWebResponse)httpWebRequest.GetResponse();
                    using (var streamReaderConsultation = new StreamReader(httpResponseConsultation.GetResponseStream()))
                    {
                        string resultConsultation = streamReaderConsultation.ReadToEnd();
                        objList = JsonConvert.DeserializeObject<List<K>>(resultConsultation);
                    }
                }
                else
                {
                    objList = null;
                }
            }
            catch (WebException e)
            {
                //+++++Log                                                                                                          
                Core.clsLog.EcrireDansFichierLog("Error clsAppelServiceWeb :" + e.Message);
            }
            catch (Exception ex)
            {
                //+++++Log                                                                                                          
                Core.clsLog.EcrireDansFichierLog("Error clsAppelServiceWeb :" + ex.Message);
            }

            return objList;
        }


        public static bool IsNetworkConnected()
        {
            bool connected = SystemInformation.Network;
            if (connected)
            {
                connected = false;
                System.Management.ManagementObjectSearcher searcher = new System.Management.ManagementObjectSearcher("SELECT NetConnectionStatus FROM Win32_NetworkAdapter");
                foreach (System.Management.ManagementObject networkAdapter in searcher.Get())
                {
                    if (networkAdapter["NetConnectionStatus"] != null)
                    {
                        if (Convert.ToInt32(networkAdapter["NetConnectionStatus"]).Equals(2))
                        {
                            connected = true;
                            break;
                        }
                    }
                }
                searcher.Dispose();
            }
            return connected;
        }
    }
}