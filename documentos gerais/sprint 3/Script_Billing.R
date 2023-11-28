

# criando uma coluna de custos acumulados
costs$cost <- cumsum(costs$`EC2 Instância`)
# criando um data frame apenas com os custos por dia e custos acumulados
data <- data.frame(dia = as.Date(costs$Serviço),custo_dia = costs$`EC2 Instância`, custo_acumulado = costs$cost)
# criando um segundo data frame eliminando os 0
data_trusted <- data[data$custo_dia != 0,]
# Transformando o data frame em time series, no caso frequência diária por isso o
#365, criando tanto para o custo por dia quanto o custo acumulado
ts_data <- ts(data_trusted$custo_dia, start = min(data$dia),frequency = 365)
ts_data2 <- ts(data_trusted$custo_acumulado, start = min(data$dia),frequency = 365)
modelo <- auto.arima(ts_data)
f <- forecast(modelo, level = c(95), h = 30)
plot(f)
summary(f)

library(dplyr)
library(forecast)
library(ggplot2)
library(lubridate)


h = 7
f_7dias <- forecast(modelo, level = c(95), h = 7)
summary(f_7dias)
soma_novembro <- data %>%
  filter(month(dia) == 11) %>%
  summarise(soma_valor = sum(costs$`EC2 Instância` ))
soma_novembro

f_mes <- forecast(modelo, level = c(95),h = 35)
f_data_frame <- as.data.frame(f_mes)
View(f_data_frame)

soma_mes <- f_data_frame %>% summarise(soma_valor = sum(`Point Forecast`))

soma_mes

gasto_total <- data_trusted %>%
  summarise(soma_valor = sum(costs$`EC2 Instância`))
gasto_total

gasto_total + soma_mes

modelo_ses <- ses(ts_data, level = c(95),
                  initial = "simple",
                  h = 35)
previsao_ses <- forecast(modelo_ses, h = 35)
plot(previsao_ses)

previsao_ses

modelo_holt <- holt(ts_data, h=35)
previsao_holt <- forecast(modelo_holt, h = 35)
previsao_holt
